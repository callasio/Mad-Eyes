# Use the official Node.js 22 image
FROM node:22

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variable
ENV PORT=8080

# Build the application
RUN npm run build

# Expose the new port
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"]