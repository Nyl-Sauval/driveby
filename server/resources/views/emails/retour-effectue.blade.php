<h1>Retour de votre véhicule effectué !</h1>

<p>Bonjour {{ $location->client->client_name }} {{$location->client->client_firstname}},</p>

<p>Le retour de votre véhicule {{ $location->car->car_brand }} {{ $location->car->car_model }} a bien été enregistrée.</p>

<p>Date de retour: {{ optional($location->retour)->return_date }}</p>
<p>Kilométrage du véhicule : {{ optional($location->retour)->return_mileage }} km</p>
<p>Niveau d'essence : {{optional($location->retour)->return_fuel_level}}</p>
<p>Défaut : {{ optional($location->retour)->return_default }}</p>

<p>Merci pour votre confiance et bonne route !</p>
