FROM node:24.16-alpine

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD ./src ${APP_ROOT}
COPY ./package.json ${APP_ROOT}/package.json

EXPOSE 3000

CMD [ "npm", "run", "buildStart" ]
