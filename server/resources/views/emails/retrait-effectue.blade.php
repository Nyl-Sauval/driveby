<h1>Retrait de votre véhicule effectué !</h1>

<p>Bonjour {{ $location->client->client_name }} {{$location->client->client_firstname}},</p>

<p>Le retrait de votre véhicule {{ $location->car->car_brand }} {{ $location->car->car_model }} a bien été enregistrée.</p>

<p>Date de retrait: {{ optional($location->retrait)->withdrawal_date }}</p>
<p>Kilométrage du véhicule : {{ optional($location->retrait)->withdrawal_mileage }} km</p>
<p>Niveau d'essence : {{optional($location->retrait)->withdrawal_fuel_level}}</p>
<p>Défaut : {{ optional($location->retrait)->withdrawal_default }}</p>

<p>Merci pour votre confiance et bonne route !</p>
