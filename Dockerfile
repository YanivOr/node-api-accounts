FROM node:11.1.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#RUN npm install
# If you are building your code for production
#ENV NODE_ENV production
RUN npm ci --only=production

# Bundle app source
COPY . .

# env
ENV NODE_ENV production
ENV MONGODB_URI "mongodb://mongo:27017/a-million-projects"
ENV PORT 3001
ENV MASTER_KEY 123456

#expose
EXPOSE 3001

CMD [ "node", "./src/index" ]
