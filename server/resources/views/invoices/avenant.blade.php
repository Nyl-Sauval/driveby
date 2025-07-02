<header>
    <h1>Avenant de Location</h1>
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
    <h2>Informations Avenant</h2>
    <table>
        <tr>
            <td><strong>Date :</strong></td>
            <td>{{ $location->avenant->avenant_date }}</td>
        </tr>
        <tr>
            <td><strong>Détails :</strong></td>
            <td>{{ $location->avenant->avenant_details }}</td>
        </tr>
        <tr>
            <td><strong>Prix :</strong></td>
            <td>{{ $location->avenant->avenant_price }} €</td>
        </tr>
    </table>
</div>
