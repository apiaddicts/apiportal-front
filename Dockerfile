FROM node:12-alpine AS build-stage
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

COPY . /usr/src/app/
RUN npm run build
#EXPOSE 3000
#CMD [ "npm", "run", "start" ]

FROM nginxinc/nginx-unprivileged:1.23
COPY --from=build-stage /usr/src/app/build/ /usr/share/nginx/html
COPY --from=build-stage /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]