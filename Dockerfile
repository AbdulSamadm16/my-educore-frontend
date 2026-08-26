# Stage 1: Build the React application with Vite
FROM node:20-alpine AS build

WORKDIR /app

# Build arguments for Vite environment variables
ARG VITE_API_URL=/api/v1
ARG VITE_RAZORPAY_KEY_ID

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_RAZORPAY_KEY_ID=$VITE_RAZORPAY_KEY_ID

# Copy package management files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code and build project
COPY . .
RUN npm run build

# Stage 2: Serve application with Nginx
FROM nginx:alpine AS runner

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static build artifacts from build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
