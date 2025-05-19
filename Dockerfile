# Step 1: Build the Vite React app
FROM node:18-alpine AS builder
WORKDIR /app

# Accept build-time environment variables
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copy project files
COPY package.json pnpm-lock.yaml* ./
RUN npm install

COPY . .

# 👇 Write .env file dynamically using build args
RUN echo "VITE_API_URL=$VITE_API_URL" > .env

# Run build (Vite will read from .env automatically)
RUN npm run build

# Step 2: Serve built app with Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
