#!/bin/sh
# Writes the dashboard proxy (see nginx.conf) when DASHBOARD_URL is set, e.g.
# https://andrho-tracker-dashboard-production.up.railway.app. Without it the
# site works as before and /dashboard/ falls back to the landing.
set -eu
mkdir -p /etc/nginx/andrho
rm -f /etc/nginx/andrho/dashboard.conf
url="$(printf '%s' "${DASHBOARD_URL:-}" | sed 's#/*$##')"
if [ -n "$url" ]; then
  cat > /etc/nginx/andrho/dashboard.conf <<CONF
location = /dashboard {
    return 301 /dashboard/;
}
location /dashboard/ {
    proxy_pass $url;
    proxy_set_header Host \$proxy_host;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_ssl_server_name on;
}
location /api/ {
    proxy_pass $url;
    proxy_set_header Host \$proxy_host;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_ssl_server_name on;
}
CONF
fi
exec nginx -g 'daemon off;'
