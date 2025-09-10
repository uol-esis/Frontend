# Stage 1: Build the React application
FROM node:lts-alpine AS builder


# Define build arguments for environment variables
ARG OAUTH_URL
ARG OAUTH_REALM
ARG OAUTH_CLIENT_ID
ARG OAUTH_ENABLED

# Set environment variables during the build process
ENV VITE_OAUTH_URL=$OAUTH_URL
ENV VITE_OAUTH_REALM=$OAUTH_REALM
ENV VITE_OAUTH_CLIENT_ID=$OAUTH_CLIENT_ID
ENV VITE_OAUTH_ENABLE=$OAUTH_ENABLED

WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache git

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:stable-alpine

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration template and entrypoint script
COPY ./nginx/nginx.conf.template /etc/nginx/nginx.conf.template
COPY ./nginx/entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port 80
EXPOSE 80

# Run the entrypoint script when the container starts
ENTRYPOINT ["/docker-entrypoint.sh"]
