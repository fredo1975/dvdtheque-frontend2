FROM node:10-alpine as build-stage

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY ./ /app/

ARG configuration=$arg

RUN echo $configuration

RUN npm run build -- --output-path=./dist/out --configuration $configuration

FROM nginx:alpine

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf