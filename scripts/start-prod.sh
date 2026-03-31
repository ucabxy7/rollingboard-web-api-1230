#!/bin/bash

echo "=== Running Prisma migrations ==="
npx prisma migrate deploy

echo "Starting production server"
node dist/index.js
