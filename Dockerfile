FROM --platform=linux/amd64 node:14.17.4 

WORKDIR /usr/src/app

COPY package.json ./
COPY ./packages/server/package.json ./packages/server/
COPY yarn.lock ./


RUN yarn install 

COPY ./packages/server ./packages/server

COPY ./packages/server/.env.production ./packages/server/.env

WORKDIR ./packages/server
RUN yarn build

ENV NODE_ENV production


EXPOSE 8080
CMD [ "node", "dist/index.js" ]
USER node  