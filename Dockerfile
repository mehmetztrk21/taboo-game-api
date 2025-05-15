from node:18-alpine
workdir /app
copy . .
entrypoint ["node", "dist/index.js"]