FROM node:14-alpine


WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

COPY ./public /app/public
COPY . /app

RUN yarn
RUN yarn build
EXPOSE 80
CMD yarn start -p 80