# Use the Bun image as the base image
FROM oven/bun:latest

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install dependencies
RUN apt-get update -y && apt-get install curl wget ca-certificates -y
RUN bun install --frozen-lockfile

# Run the server when the container launches
ENTRYPOINT ["turbo", "run", "start:bun"]
