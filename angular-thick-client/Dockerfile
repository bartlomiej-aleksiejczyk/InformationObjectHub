FROM node:alpine AS build
ARG IMAGE_NAME
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build-dev

FROM nginx:alpine
COPY --from=build /app/dist/angular-thick-client/browser /usr/share/nginx/html
COPY ./nginx/nginx.conf.template /etc/nginx/nginx.conf.template
COPY ./nginx/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]