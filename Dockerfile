FROM node:4.4.4

# Create app directory
RUN groupadd -r nodetest && useradd -r -g nodetest nodetest
RUN mkdir -p /src

# Install app dependencies
COPY package.json /src/
WORKDIR /src
RUN npm install

# Bundle app source
COPY . /src
USER nodetest
EXPOSE 3000
CMD [ "npm", "start" ]
