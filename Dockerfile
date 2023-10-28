FROM php:8.2.12-apache
RUN a2enmod ssl 
RUN a2enmod rewrite
RUN mkdir -p /etc/apache2/ssl/
# COPY ./php/php.ini /usr/local/etc/php/php.ini-development
COPY ./ssl/*.pem /etc/apache2/ssl/
COPY ./apache/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY --chown=www-data:www-data ./assets /var/www/pwa/assets
RUN apache2ctl configtest
WORKDIR /var/www/pwa
EXPOSE 80
EXPOSE 443