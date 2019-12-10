FROM nginx:1.17.6

RUN rm /etc/nginx/conf.d/default.conf

COPY app.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /app