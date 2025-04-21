# ---------- Build stage ----------
FROM node:current-slim AS build
WORKDIR /app

# Install curl, unzip, and git for Bun
RUN apt-get update && apt-get install -y curl unzip git \
  && rm -rf /var/lib/apt/lists/*

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash \
  && mv /root/.bun/bin/bun /usr/local/bin/bun

# Pre-copy only lockfile and package for caching
COPY bun.lockb package.json ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the full source
COPY . .

# Build using Bun
RUN bun run build

# ---------- Runtime stage ----------
FROM node:current-slim AS runtime

WORKDIR /app

# Copy built files and node_modules from build stage
COPY --from=build /app /app

# Only copy Bun if you still want it in runtime (optional)
COPY --from=build /usr/local/bin/bun /usr/local/bin/bun

# Start the app using Node
CMD ["npm", "run", "start:node"]    