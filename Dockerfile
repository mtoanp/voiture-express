# Step 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install

# Copy the source code
COPY . .

# Build the app
RUN npm run build

# Step 2: Serve with a lightweight web server
FROM nginx:stable-alpine

# Copy built files to nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove default nginx config and replace with ours
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Expose the default nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
