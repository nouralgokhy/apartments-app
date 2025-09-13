#!/usr/bin/env sh
set -e

echo "Applying migrations (deploy)..."
if npx prisma migrate deploy; then
  echo "Migrations applied."
else
  echo "migrate deploy failed; syncing schema with db push..."
  npx prisma db push
fi

echo "Seeding database..."
npx prisma db seed


echo "Starting API on $HOST:$PORT ..."

node dist/server.js
# If you want to run in dev mode (not recommended for production), uncomment below
# npx ts-node-dev --respawn --transpile-only src/server.ts