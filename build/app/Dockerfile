FROM golang:1.23.2-alpine3.20

RUN apk update && apk add git

RUN mkdir -p /app/simple-todo-app

WORKDIR /app/simple-todo-app

RUN go install github.com/air-verse/air@latest

COPY ./simple-todo-app .

CMD ["air"]
