FROM node:12-alpine
# ENV NODE_OPTIONS=--openssl-legacy-provider
ENV NODE_ENV production
ENV DISABLE_ESLINT_PLUGIN true
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

# USER node
RUN npm install
ARG REACT_APP_STRAPI_URL
ARG REACT_APP_SURA_URL
ARG REACT_APP_SUBSCRIPTION_ID
ARG REACT_APP_RESOURCE_GROUP_NAME
ARG REACT_APP_SERVICE_NAME

COPY . /usr/src/app/
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start" ]