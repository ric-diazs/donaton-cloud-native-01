#!/bin/sh

set -e

echo "Aplicando migraciones..."
npx prisma migrate deploy

echo "Ejecutando seed..."
npx prisma db seed

echo "Iniciando API..."
exec node server.js
