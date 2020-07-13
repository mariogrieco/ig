FROM node:10.15.3-alpine AS node-builder
WORKDIR /srv/app
COPY ./package.json ./package-lock.json ./

RUN npm install

COPY ./.flowconfig ./.eslintrc.json ./config-overrides.js ./
COPY ./webpackConfig ./webpackConfig
COPY ./public/index.html ./public/index.html
COPY ./src ./src
RUN ls
RUN npm run build

FROM nginx:1.15.9-alpine AS prod
WORKDIR /srv/app/build

COPY .docker/nginx/conf.d/*.conf /etc/nginx/conf.d/

COPY --from=node-builder /srv/app/build ./

FROM node-builder AS dev

WORKDIR /srv/app
COPY .docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["start"]
