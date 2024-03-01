# Stage 1: Build the application
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm i 

COPY . .
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine as production

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "start:prod"]