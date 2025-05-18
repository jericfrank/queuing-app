# --- Stage 1: Build React App ---
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install deps
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the React app (with error output if it fails)
RUN npm run build || (echo "❌ Build failed" && cat /app/npm-debug.log || true && exit 1)

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine AS production

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
