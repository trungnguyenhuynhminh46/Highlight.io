FROM node:18.16.1-alpine as backend

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 3001

CMD npm run build && npm run start:prod
