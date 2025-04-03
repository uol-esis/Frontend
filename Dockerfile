FROM node:18.17.1-alpine

# Define build arguments for environment variables
ARG VITE_API_BASE_URL
ARG VITE_API_KEY

# Set environment variables during the build process
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_API_KEY=$VITE_API_KEY

WORKDIR /app

COPY package.json .
RUN apk add --no-cache git
RUN npm install
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]