FROM node:alpine
# ENV NODE_OPTIONS=--openssl-legacy-provider
ENV NODE_ENV production
ENV DISABLE_ESLINT_PLUGIN true
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

# USER node
RUN npm install
COPY . /usr/src/app/
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start" ]