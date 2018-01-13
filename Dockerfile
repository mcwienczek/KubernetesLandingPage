FROM node:8

RUN mkdir -p /app

ENV NODE_ENV=production

EXPOSE 3000

# install dependencies first, in a different location for easier app bind mounting for local development
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install && npm cache clean --force

# copy in our source code last, as it changes the most
WORKDIR /app
COPY . /app

# if you want to use npm start instead, then use `docker run --init in production`
# so that signals are passed properly. Note the code in index.js is needed to catch Docker signals
# using node here is still more graceful stopping then npm with --init afaik
# I still can't come up with a good production way to run with npm and graceful shutdown
CMD [ "node", "app.js" ]