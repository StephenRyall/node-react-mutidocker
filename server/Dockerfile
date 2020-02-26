FROM node:8.7.0-alpine

RUN mkdir -p /srv/app/test-app-server
WORKDIR /srv/app/test-app-server

COPY package.json /srv/app/test-app-server
COPY package-lock.json /srv/app/test-app-server

RUN npm install

COPY . /srv/app/test-app-server

CMD [ "npm", "run", "dev-server" ]