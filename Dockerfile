FROM node:16.20.2-bullseye

RUN apt-get update && apt-get install -y \
    yarn

WORKDIR /usr/src/flamingo

COPY .next ./.next

COPY public ./public

COPY node_modules ./node_modules

COPY package.json .

COPY yarn.lock .

EXPOSE 1919

CMD ["yarn", "deploy"]