FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install && npm run build

# use `serve` to host the static build
RUN npm install -g serve

EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]
