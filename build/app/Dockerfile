FROM golang:1.23.2-alpine3.20

RUN apk update && apk add git

RUN mkdir -p /app/simple-todo

WORKDIR /app/simple-todo

COPY ./simple-todo .
