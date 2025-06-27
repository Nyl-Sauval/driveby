<?php

namespace App\Http\Resources;

class AgencyResource extends \Illuminate\Http\Resources\Json\JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->agency_name,
            'description' => $this->agency_description,
            'address' => $this->agency_address,
            'postal_code' => $this->agency_postal_code,
            'city' => $this->agency_city,
            'schedule' => $this->agency_schedules,
            'email' => $this->agency_email,
            'phone' => $this->agency_phone,
            'website' => $this->agency_website,
        ];
    }
}
