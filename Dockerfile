FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY portfolio.html /usr/share/nginx/html/index.html
COPY portfolio.css portfolio.js /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 10000
