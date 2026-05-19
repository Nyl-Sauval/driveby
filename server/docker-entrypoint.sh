#!/bin/bash
set -e

# Créer le fichier SQLite s'il n'existe pas encore
mkdir -p /var/www/html/database
touch /var/www/html/database/database.sqlite
chown -R www-data:www-data /var/www/html/database /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 777 /var/www/html/database /var/www/html/storage /var/www/html/bootstrap/cache

# Lancer les migrations et seeds uniquement si la table users n'existe pas encore
if ! php artisan tinker --execute="DB::table('users')->count();" 2>/dev/null; then
    echo "🚀 Running migrations and seeds..."
    php artisan migrate --force --seed
else
    echo "✅ Database already initialized, running migrate only..."
    php artisan migrate --force
fi

# Démarrer Apache
exec apache2-foreground
