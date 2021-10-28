FROM node:14-alpine

ARG BUILD_VERSION

WORKDIR /app

COPY package* ./

COPY ./public ./public
COPY . .

RUN echo VERSION=$BUILD_VERSION >> ./.env.production

RUN npm ci
RUN npm run build
EXPOSE 80
CMD npm start -- -p 80