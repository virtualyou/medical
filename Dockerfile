FROM node:14
# nodejs.org guides nodejs-docker-webapp

# create app directory
WORKDIR /usr/src/app

# install deps
COPY package*.json ./
RUN npm install
# RUN npm ci --only=production 

# Bundle app source
COPY . .

EXPOSE 3000 

# Run app
CMD [ "node", "server.js" ]


