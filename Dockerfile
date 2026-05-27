# =========================
# BUILD STAGE
# =========================
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy dependency files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build Vite app
RUN bun run build


# =========================
# RUNTIME STAGE
# =========================
FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy build result
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]