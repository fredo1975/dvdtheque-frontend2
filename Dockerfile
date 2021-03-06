FROM node:12.14.1-slim as build-stage

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY ./ /app/

ARG arg

ENV CONF=${arg}

RUN npm run build -- --output-path=./dist/out --configuration ${CONF}

FROM nginx:alpine

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf