FROM node:lts-alpine AS dist

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build


FROM node:lts-alpine AS node_modules

COPY package.json yarn.lock ./

RUN yarn install --prod


FROM node:lts-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=dist dist /usr/src/app/dist

COPY --from=node_modules node_modules /usr/src/app/node_modules

COPY . /usr/src/app

RUN yarn add global nestjs

EXPOSE $PORT

CMD ["yarn", "start:prod" ]
