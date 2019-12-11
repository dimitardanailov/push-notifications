FROM php:7.4.0-fpm-alpine3.10

RUN apk add --no-cache libzip-dev && docker-php-ext-configure zip && docker-php-ext-install zip

COPY www.conf /usr/local/etc/php-fpm.d/www.conf

WORKDIR /app

CMD ["php-fpm", "--nodaemonize"]