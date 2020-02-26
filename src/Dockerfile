FROM node:8.7.0-alpine

RUN mkdir -p /srv/app/test-app-src
WORKDIR /srv/app/test-app-src

COPY package.json /srv/app/test-app-src
COPY package-lock.json /srv/app/test-app-src

RUN npm install

COPY . /srv/app/test-app-src

EXPOSE 8080
CMD [ "npm", "run", "dev-client" ]