"""Offline analysis for the AndRho asteroid-game color-scheme experiment.

The game (src/components/ui/AsteroidGame.jsx) reports its data as custom
events through the web-tracker's pipeline (see src/lib/gameStorage.js) —
there is no separate database for this. Every row lives in the tracker's
own `events` table (site_id='andrho'), one of:
  - type='game_session'        one per play session
  - type='game_theme_segment'  one per (session x theme) rotation slice
  - type='game_registration'   one per discount claim

This script connects directly to that same Postgres instance (the one
`WebTracker` and `andrho-tracker-dashboard` already use — see this repo's
README for how to get DATABASE_URL from Railway) and runs:

  1. One-way ANOVA: does performance (asteroids destroyed per second)
     differ by color theme?
  2. Two-way ANOVA: does the effect of theme on performance depend on
     commerce type, for sessions that ended in a discount registration?

For a quick descriptive look at the same data without running Python, see
the "Minijuego" tab in andrho-tracker-dashboard instead.

Usage:
  pip install pandas scipy statsmodels psycopg2-binary
  export DATABASE_URL=postgresql://user:password@host:5432/railway
  python analysis/anova.py
"""

import os

import pandas as pd
import psycopg2
import statsmodels.api as sm
from scipy import stats
from statsmodels.formula.api import ols

SITE_ID = "andrho"


def load_data():
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    try:
        segments = pd.read_sql_query(
            """
            SELECT
              payload->>'session_id' AS session_id,
              payload->>'theme' AS theme,
              (payload->>'duration_ms')::numeric AS duration_ms,
              (payload->>'destroyed')::numeric AS destroyed,
              (payload->>'missed')::numeric AS missed
            FROM events
            WHERE site_id = %(site_id)s AND type = 'game_theme_segment'
            """,
            conn,
            params={"site_id": SITE_ID},
        )
        registrations = pd.read_sql_query(
            """
            SELECT DISTINCT ON (payload->>'session_id')
              payload->>'session_id' AS session_id,
              payload->>'commerce_type' AS commerce_type,
              payload->>'commerce_size' AS commerce_size
            FROM events
            WHERE site_id = %(site_id)s AND type = 'game_registration'
            ORDER BY payload->>'session_id', occurred_at DESC
            """,
            conn,
            params={"site_id": SITE_ID},
        )
    finally:
        conn.close()
    return segments, registrations


def with_rate(segments):
    segments = segments.copy()
    segments["rate"] = segments["destroyed"] / (segments["duration_ms"] / 1000)
    return segments


def one_way_anova(segments):
    """Does theme alone explain differences in destroy rate?"""
    segments = with_rate(segments)
    groups = [group["rate"].to_numpy() for _, group in segments.groupby("theme")]
    f_stat, p_value = stats.f_oneway(*groups)
    print(f"One-way ANOVA (destroyed/sec ~ theme): F={f_stat:.3f}, p={p_value:.4f}")
    print(segments.groupby("theme")["rate"].agg(["mean", "std", "count"]))
    return f_stat, p_value


def two_way_anova(segments, registrations):
    """Does theme interact with commerce_type to affect destroy rate?"""
    segments = with_rate(segments)
    merged = segments.merge(registrations[["session_id", "commerce_type"]], on="session_id", how="inner")

    if merged.empty:
        print("No segments joined to a registration yet — need more claimed sessions.")
        return None

    model = ols("rate ~ C(theme) * C(commerce_type)", data=merged).fit()
    table = sm.stats.anova_lm(model, typ=2)
    print(table)
    return table


if __name__ == "__main__":
    segments_df, registrations_df = load_data()
    if segments_df.empty:
        print("No game_theme_segment events yet — play a few sessions first.")
    else:
        one_way_anova(segments_df)
        print()
        two_way_anova(segments_df, registrations_df)
