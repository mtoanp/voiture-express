# -----------------------------
# 🧱 Step 1: Build the Vite React app
# -----------------------------
FROM node:18-alpine AS builder
WORKDIR /app

# 👉 Accept build-time environment variable from CapRover
# ARG allows CapRover to inject VITE_API_URL at build time
ARG VITE_API_URL

# 👉 Make VITE_API_URL available as an environment variable inside this stage
ENV VITE_API_URL=$VITE_API_URL

# 👉 Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN npm install

# 👉 Copy the rest of the app source
COPY . .

# 👉 Inject the env variable into a .env file for Vite to read at build time
RUN echo "VITE_API_URL=$VITE_API_URL" > .env

# 👉 Build the Vite app – it will use the value from .env
# Example result: import.meta.env.VITE_API_URL = 'https://api.voiture-express.com'
RUN npm run build


# -----------------------------
# 🚀 Step 2: Serve the app using Nginx
# -----------------------------
FROM nginx:stable-alpine

# 👉 Copy built static files to Nginx's web root
COPY --from=builder /app/dist /usr/share/nginx/html

# 👉 Expose default Nginx port (CapRover expects this)
EXPOSE 80

# 👉 Start Nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]
