FROM node:14-alpine

WORKDIR /app

COPY package* ./

COPY ./public ./public
COPY . .

RUN npm ci
RUN npm run build
EXPOSE 80
CMD npm start -- -p 80