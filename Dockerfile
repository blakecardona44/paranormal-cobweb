FROM node:22-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
# Existing dependencies mix MUI major versions; match the repository's legacy resolution.
RUN npm ci --legacy-peer-deps --no-audit --no-fund --loglevel=info

FROM dependencies AS builder
WORKDIR /app
COPY . .

# Only public configuration belongs in build arguments. Supply credentials at runtime.
ARG NEXT_PUBLIC_SITE_URL=https://dashboard.elizabethjudithmartinez.com
ARG NEXT_PUBLIC_IMAGE_SERVER
ARG NEXT_PUBLIC_HOST_API
ARG NEXT_PUBLIC_ASSETS_API
ARG NEXT_PUBLIC_MAPBOX_TOKEN
ARG NEXT_PUBLIC_MAPBOX_API
ENV NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_IMAGE_SERVER=$NEXT_PUBLIC_IMAGE_SERVER \
    NEXT_PUBLIC_HOST_API=$NEXT_PUBLIC_HOST_API \
    NEXT_PUBLIC_ASSETS_API=$NEXT_PUBLIC_ASSETS_API \
    NEXT_PUBLIC_MAPBOX_TOKEN=$NEXT_PUBLIC_MAPBOX_TOKEN \
    NEXT_PUBLIC_MAPBOX_API=$NEXT_PUBLIC_MAPBOX_API
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
