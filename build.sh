#!/bin/bash

# Exit on error
set -e

# Print commands
set -x

# Clean npm cache
npm cache clean --force

# Remove node_modules if it exists
if [ -d "node_modules" ]; then
  rm -rf node_modules
fi

# Remove package-lock.json if it exists
if [ -f "package-lock.json" ]; then
  rm package-lock.json
fi

# Copy our backup package-lock.json
if [ -f "package-lock.json.backup" ]; then
  cp package-lock.json.backup package-lock.json
fi

# Install dependencies with all flags to bypass issues
npm ci --legacy-peer-deps --no-fund --no-audit --no-optional

# Build the application
npm run build
