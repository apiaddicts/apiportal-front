FROM node:alpine
# ENV NODE_OPTIONS=--openssl-legacy-provider
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

# USER node
RUN npm install
EXPOSE 3000

CMD [ "npm", "run", "start" ]