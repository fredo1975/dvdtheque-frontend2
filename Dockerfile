FROM node:10-alpine as build-stage

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY ./ /app/

RUN echo "$ARG"

ARG CONF=$ARG

RUN echo "$CONF"

RUN npm run build -- --output-path=./dist/out --configuration ${ARG}

FROM nginx:alpine

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf