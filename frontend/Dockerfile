FROM node:alpine as builder

WORKDIR /app

ENV DISABLE_ESLINT_PLUGIN=true

COPY package*.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:alpine as runtime

WORKDIR /usr/share/nginx/html

ENV FRONTEND_API_URL_BASE="http://localhost:8080"

RUN rm -rf ./*

COPY nginx.conf /default.conf
COPY --from=builder /app/build .

CMD ["/bin/sh" , "-c" , "envsubst '$FRONTEND_API_URL_BASE' < /default.conf > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]