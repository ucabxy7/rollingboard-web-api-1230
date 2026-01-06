#!/bin/bash

echo "Migrating production database"
npx prisma migrate deploy

echo "Starting production server"
node dist/index.js
