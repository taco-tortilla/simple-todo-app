FROM node:22-alpine3.19

RUN apk update && apk add git

RUN mkdir -p /app/simple-todo-app

WORKDIR /app/simple-todo-app

COPY /simple-todo-app/package.json /simple-todo-app/yarn.lock ./

RUN yarn install

CMD ["yarn", "run", "dev"]
