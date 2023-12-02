FROM mcr.microsoft.com/playwright:v1.40.0
USER root

ENV HOME /mbio_test

WORKDIR ${HOME}
COPY . ${HOME}
COPY . .env

RUN yarn install

CMD [ "yarn", "test:e2e" ]