# Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Inlined into login/signup at build time (see .env.example)
ARG VITE_ANDRHO_API_URL
ENV VITE_ANDRHO_API_URL=$VITE_ANDRHO_API_URL

RUN npm run build

# Runtime
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint-andrho.sh

# DASHBOARD_URL (runtime): the dashboard's public URL, proxied at /dashboard/.
EXPOSE 80

CMD ["/docker-entrypoint-andrho.sh"]
