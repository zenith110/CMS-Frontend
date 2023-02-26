FROM node:alpine

# set working directory
WORKDIR /app

# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package.json ./
# Installs all node packages
RUN npm install 
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]