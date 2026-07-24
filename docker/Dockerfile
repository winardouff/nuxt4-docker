FROM node:24.16-alpine

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD ../ ${APP_ROOT}

EXPOSE 3000

CMD [ "npm", "run", "buildStart" ]
