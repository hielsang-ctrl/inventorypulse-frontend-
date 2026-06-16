# ── Stage 1: Build ────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
# Output is in /app/dist

# ── Stage 2: Serve with Nginx ──────────────────────
FROM nginx:1.27-alpine

# Copy built React app
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
