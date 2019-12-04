FROM php:7.4-cli

RUN apt-get update && apt-get install -y zlib1g-dev \
	&& docker-php-ext-install zip

COPY . /usr/src/safari-apns-docker
WORKDIR /usr/src/safari-apns-docker
CMD [ "php", "./createPushPackage.php" ]