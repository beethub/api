FROM node:10-slim as build
WORKDIR /usr/app

COPY package-lock.json package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:10-slim as runtime
ENV PORT 4000
EXPOSE 4000
WORKDIR /usr/app
RUN npm install --production
ENV  NODE_ENV production
COPY --from=build /usr/app/package-lock.json /usr/app/package.json ./
COPY --from=build /usr/app/dist/ .
CMD ["node", "server.js"]