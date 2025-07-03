<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Facture Location Voiture</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            margin: 0;
            padding: 30px;
            color: #333;
        }
        header {
            text-align: center;
            margin-bottom: 30px;
        }
        h1 {
            margin: 0;
            font-size: 22px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section h2 {
            font-size: 14px;
            margin-bottom: 8px;
            border-bottom: 1px solid #999;
            padding-bottom: 4px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        td {
            padding: 4px 8px;
            vertical-align: top;
        }
        .car-image {
            max-width: 100%;
            max-height: 150px;
            margin-top: 10px;
        }
        .total {
            font-weight: bold;
            font-size: 16px;
            text-align: right;
            margin-top: 30px;
            border-top: 1px solid #000;
            padding-top: 10px;
        }
    </style>
</head>
<body>

<header>
    <h1>Facture de Location</h1>
    <p>Date de génération : {{ now()->format('d/m/Y') }}</p>
</header>

<div class="section">
    <h2>Informations Client</h2>
    <table>
        <tr>
            <td><strong>Nom :</strong></td>
            <td>{{ $location->client->client_name }}</td>
            <td><strong>Prénom :</strong></td>
            <td>{{ $location->client->client_firstname }}</td>
        </tr>
        <tr>
            <td><strong>Email :</strong></td>
            <td>{{ $location->client->client_email }}</td>
            <td><strong>Date de naissance :</strong></td>
            <td>{{ $location->client->client_birth }}</td>
        </tr>
        <tr>
            <td><strong>N° permis :</strong></td>
            <td>{{ $location->client->client_license_number }}</td>
            <td><strong>Délivré le :</strong></td>
            <td>{{ $location->client->client_license_issue_date }}</td>
        </tr>
        <tr>
            <td><strong>Expire le :</strong></td>
            <td>{{ $location->client->client_license_expiry_date }}</td>
        </tr>
    </table>
</div>

<div class="section">
    <h2>Informations Véhicule</h2>
    <table>
        <tr>
            <td><strong>Modèle :</strong></td>
            <td>{{ $location->car->car_model }}</td>
            <td><strong>Marque :</strong></td>
            <td>{{ $location->car->car_brand }}</td>
        </tr>
        <tr>
            <td><strong>Carburant :</strong></td>
            <td>{{ $location->car->car_fuel }}</td>
            <td><strong>Prix / jour :</strong></td>
            <td>{{ number_format($location->car->car_price/100, 2, ',', ' ') }} €</td>
        </tr>
    </table>
    @if($location->car->car_picture)
        <img class="car-image" src="{{ $location->car->car_picture }}" alt="Voiture">
    @endif
</div>

<div class="garantie-options">
    <h2>Détails Garantie et Options</h2>
    <table>
        <tr>
            <td><strong>Garantie :</strong></td>
            <td>{{ $garantie->guarantee_name }}</td>
            <td><strong>Prix :</strong></td>
            <td>{{ number_format($garantie->guarantee_price, 2, ',', ' ') }} €/jour</td>
        </tr>
    </table>
</div>

<div class="section">
    <h2>Détails de la Location</h2>
    <table>
        <tr>
            <td><strong>Date de retrait :</strong></td>
            <td>{{ optional($location->retrait)->withdrawal_date }}</td>
            <td><strong>Date de retour :</strong></td>
            <td>{{ optional($location->retour)->return_date }}</td>
        </tr>
        <tr>
            <td><strong>Agence :</strong></td>
            <td>{{ $agency->agency_name }}</td>
        </tr>
        <tr>
            <td><strong>Adresse :</strong></td>
            <td>{{ $agency->agency_address}}</td>
            <td> {{$agency->agency_postal_code}}, {{$agency->agency_city}}</td>
        </tr>
    </table>
</div>

@php
    $start = new DateTime(optional($location->retrait)->withdrawal_date);
    $end = new DateTime(optional($location->retour)->return_date);
    $days = $start->diff($end)->days + 1;
    $total = $days * (($location->car->car_price/100)+$garantie->guarantee_price);
@endphp

<div class="total">
    Total ({{ $days }} jour{{ $days > 1 ? 's' : '' }}) : {{ number_format($total, 2, ',', ' ') }} €
</div>

</body>
</html>
