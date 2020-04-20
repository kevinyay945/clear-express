FROM node:8.11-alpine

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json /usr/src/app/
RUN npm install
RUN npm install pm2 -g
COPY . /usr/src/app

ENV PORT 5000
EXPOSE $PORT
ENV DEBUG app:startup
EXPOSE $DEBUG
CMD [ "pm2-runtime","start", "app.js"]
