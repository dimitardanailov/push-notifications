# FROM php:7.4.0-cli
FROM php:7.2.13-fpm-alpine3.8

# RUN apt update 
# RUN apt install -y libzip-dev zlib1g-dev && docker-php-ext-install zip

COPY www.conf /usr/local/etc/php-fpm.d/www.conf

WORKDIR /app

CMD ["php-fpm", "--nodaemonize"]