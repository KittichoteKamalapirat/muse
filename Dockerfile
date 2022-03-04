FROM --platform=linux/amd64 node:14.17.4

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY ./packages/server/package.json ./packages/server/
COPY yarn.lock ./

   
#install all the packages
#no need to install devDependencies
RUN yarn install 

COPY ./packages/server ./packages/server
COPY ./packages/server/.env.production ./packages/server/.env
# ENV GENERATE_SOURCEMAP=false
# ENV NODE_OPTIONS=--max-old-space-size=16384

WORKDIR ./packages/server
RUN yarn build

ENV NODE_ENV production


EXPOSE 8080
CMD [ "node", "dist/index.js" ]
USER node  