#!/bin/bash

# Exit on error
set -e

# Print commands
set -x

# Install dependencies with legacy peer deps
npm install --legacy-peer-deps

# Build the application
npm run build
