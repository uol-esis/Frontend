#!/bin/sh
set -e

# Set a default API base URL if the environment variable is not provided
API_BASE_URL="${API_BASE_URL:-http://localhost:8080}"

# Replace the placeholder in the Nginx config template
envsubst '${API_BASE_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf

cat /etc/nginx/conf.d/default.conf

# Start Nginx in the foreground
nginx -g "daemon off;"
