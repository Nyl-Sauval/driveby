<h1>Confirmation de votre réservation</h1>

<p>Bonjour {{ $location->client->client_name }} {{$location->client->client_firstname}},</p>

<p>Votre réservation pour la voiture {{ $location->car->car_brand }} {{ $location->car->car_model }} a bien été enregistrée.</p>

<p>Date de début : {{ optional($location->retrait)->withdrawal_date }}</p>
<p>Date de fin : {{ optional($location->retour)->return_date }}</p>

<p>Vous trouverez ci-joint la facture de votre réservation</p>
<p>Merci pour votre confiance.</p>
