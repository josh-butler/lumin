FROM mhart/alpine-node:5.7

WORKDIR /src

ADD package.json package.json

RUN apk add --no-cache make gcc g++ python

RUN npm install

EXPOSE 3000

ADD . .

RUN npm run build

CMD ["npm","run", "start"]