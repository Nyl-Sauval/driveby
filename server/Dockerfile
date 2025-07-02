FROM php:8.2-cli

ENV DEBIAN_FRONTEND=noninteractive

# Installation des dépendances système et des extensions PHP requises
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    sqlite3 \
    libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite mbstring zip

# Installation de Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer


# Répertoire de travail
WORKDIR /app
COPY . /app

RUN composer install --no-interaction --prefer-dist
RUN touch database/database.sqlite
RUN chmod -R 777 database

# Exposer le port utilisé par le serveur PHP interne
EXPOSE 8000

# Démarrage du serveur PHP interne
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
