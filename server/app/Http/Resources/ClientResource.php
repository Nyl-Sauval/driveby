<?php

namespace App\Http\Resources;

class ClientResource extends \Illuminate\Http\Resources\Json\JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->client_name,
            'firstname' => $this->client_firstname,
            'email' => $this->client_email,
            'phone' => $this->client_phone,
            'birth' => $this->client_birth,
            'address' => $this->client_address,
            'postal_code' => $this->client_postal_code,
            'city' => $this->client_city,
            'country' => $this->client_country,
            'license_number' => $this->client_license_number,
            'license_issue_date' => $this->client_license_issue_date,
            'license_expiry_date' => $this->client_license_expiry_date,
            'license_country' => $this->client_license_country,
        ];
    }

}
