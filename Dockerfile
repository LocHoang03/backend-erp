# Stage 1: Build app
FROM node:20.11-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x node_modules/.bin/nest

RUN npm run build

# Stage 2: Run app
FROM node:20.11-alpine

WORKDIR /run

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/package*.json ./

EXPOSE 4000

CMD ["node", "dist/main"]
