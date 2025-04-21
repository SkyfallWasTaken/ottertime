# Use an official Debian-based image with latest Node.js (via nvm)
FROM node:current-slim AS base

# Set working directory
WORKDIR /app

# Install curl + unzip + git for downloading Bun + useful tools
RUN apt-get update && apt-get install -y curl unzip git \
  && rm -rf /var/lib/apt/lists/*

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash \
  && mv /root/.bun/bin/bun /usr/local/bin/bun

# Copy only package files first for better caching
COPY bun.lockb package.json ./

# Install dependencies using Bun (very fast)
RUN bun install --frozen-lockfile

# Copy the rest of your app
COPY . .

# Final production image (multi-stage for cleanliness)
FROM node:current-slim AS prod

WORKDIR /app

# Install only runtime deps for Node (bun isn't needed now)
COPY --from=base /app /app
COPY --from=base /usr/local/bin/bun /usr/local/bin/bun

# Optional: prune dev dependencies if using separate builds
# RUN npm prune --production

# Default command runs using Node (but Bun used for install)
CMD ["npm", "run", "start:node"]
