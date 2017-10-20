FROM debian:jessie

EXPOSE 8080

RUN apt-get update \
  && apt-get -y install curl \
  && curl -sL https://deb.nodesource.com/setup_8.x | bash - \
  && apt-get install -y nodejs

COPY package.json /tmp/package.json

WORKDIR /tmp

RUN npm install --only=production && npm cache clear --force
RUN mkdir -p /usr/src/app \
  && cp -a /tmp/node_modules /usr/src/app \
  && mkdir -p /root/.ssb

WORKDIR /usr/src/app

COPY lib .

CMD ["node", "main.js"]
