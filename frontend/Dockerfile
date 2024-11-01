FROM node:20-alpine

ENV NODE_VERSION 20.18.0

WORKDIR /app

# Copy both package and package-lock json files
COPY package.json .
COPY package-lock.json .

# Installing dependencies
RUN npm install

# Copy the folder
COPY . .

# Expose the app
EXPOSE 5173

# Run the server
CMD [ "npm", "run", "dev"]