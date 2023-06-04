FROM node:16-alpine

COPY . .

RUN npm ci

RUN npm run build

EXPOSE 80

CMD ["node", "dist/src/main.js"]
