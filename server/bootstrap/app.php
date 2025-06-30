<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Middleware\HandleCors;

return Application::configure(basePath: dirname(__DIR__))

    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )

    ->withMiddleware(function ($middleware) {
        // CORS, CSRF, TrustProxies, etc. → ajouter ici si besoin
        $middleware->append([
            HandleCors::class,
        ]);
    })

    ->withExceptions()

    ->create();
