# Use the Bun image as the base image
FROM oven/bun:latest

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install dependencies
RUN bun install --frozen-lockfile

# Build the project
RUN bun run build

# Run the server when the container launches
ENTRYPOINT ["bun", "start:bun"]
