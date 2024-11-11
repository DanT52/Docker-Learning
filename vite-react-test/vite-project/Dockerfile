# Use the official Node.js image as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Vite application
RUN npm run build

# Install 'serve' to serve the static files
RUN npm install -g serve

# Expose the port where the app will be hosted
EXPOSE 3000

# Use 'serve' to host the build files on port 8000
CMD ["serve", "-s", "dist", "-l", "3000"]
