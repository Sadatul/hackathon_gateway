FROM node:20.18.0-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci && \
    npm cache clean --force

COPY . .

CMD ["npm", "run", "start:dev"]