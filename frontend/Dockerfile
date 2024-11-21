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

# create the build version
RUN npm run build

# Expose the app
EXPOSE 4173

# Run the prod server
CMD [ "npm", "run", "preview" ]