# Build Image
FROM node:18.17.1 AS builder
WORKDIR /usr/src/app
COPY ../../package.json ../../yarn.lock ./
RUN yarn install --production

# Production Image
FROM node:18.17.1-alpine3.18
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY ../../dist/proto dist/proto
COPY ../../dist/libs dist/libs
COPY ../../dist/apps/auth dist/apps/auth
EXPOSE 50000
CMD ["sh", "-c", "NODE_ENV=local node dist/apps/auth/main.js"]


