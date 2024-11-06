# Use Nginx as the base image
FROM nginx:alpine

# Remove default Nginx static files and copy your app files
RUN rm -rf /usr/share/nginx/html/*

# Copy the frontend src to Nginx's html directory
COPY src/ /usr/share/nginx/html

# Expose the frontend port
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]