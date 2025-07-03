# Serveur API - DriveBy

## Description
API développée avec Laravel qui gère la logique métier, la base de données pour le projet DriveBy.

## Installation
1. Installer les dépendances avec Composer :
```bash
   composer install
```
2. Configurer le fichier .env avec la base de données et les variables d’environnement
```text
QUEUE_CONNECTION=database

MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=do-not-reply@drive-by.com
MAIL_FROM_NAME="DriveBy"
```
3. Lancer les migrations et les seeders:
```bash
  php artisan migrate && php artisan db:seed
```
4. Démarrer le serveur :
```bash
  php artisan serve
```


