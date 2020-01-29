FROM node:13-alpine as build

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

COPY ./public /app/public
COPY . /app

RUN yarn
RUN yarn build

FROM nginx

COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
# replace with custom one
COPY nginx.conf /etc/nginx/conf.d
# expose port 80 to the outer world
EXPOSE 80
# start nginx 
CMD ["nginx", "-g", "daemon off;"]