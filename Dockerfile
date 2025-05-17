# Step 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install

# Copy all source code
COPY . .

# Build the Vite React app
RUN npm run build

# Step 2: Serve the built app with default Nginx
FROM nginx:stable-alpine

# Copy built files to Nginx's public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for CapRover
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
