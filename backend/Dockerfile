FROM node:13-alpine

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

COPY . /app

RUN yarn

ENTRYPOINT [ "yarn", "start" ]