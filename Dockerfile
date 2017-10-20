FROM debian:jessie

EXPOSE 8080

RUN apt-get update \
  && apt-get -y install curl \
  && curl -sL https://deb.nodesource.com/setup_8.x | bash - \
  && apt-get install -y nodejs

WORKDIR /tmp

COPY package.json package.json

RUN npm install --only=production && npm cache clear --force
RUN mkdir -p /usr/src/app \
  && cp -a node_modules /usr/src/app \
  && cp package.json /usr/src/app

WORKDIR /usr/src/app

COPY src .

CMD ["node", "main.js"]
