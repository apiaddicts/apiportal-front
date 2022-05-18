FROM node:12-alpine
# ENV NODE_OPTIONS=--openssl-legacy-provider
ENV NODE_ENV production
ENV DISABLE_ESLINT_PLUGIN true
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN apk update \
    && apk --no-cache --update add build-base 

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

COPY package*.json /usr/src/app/

# USER node
RUN npm install
ARG NODE_APP_ENV
ARG NODE_APP_PORT
ARG SITE_URL
ARG STRAPI_URL
COPY . /usr/src/app/
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start" ]
