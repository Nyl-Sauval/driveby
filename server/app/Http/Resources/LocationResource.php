<?php

namespace App\Http\Resources;

use App\Models\Guarantee;

class LocationResource extends \Illuminate\Http\Resources\Json\JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'client' => new ClientResource($this->whenLoaded('client')),
            'car' => new CarResource($this->whenLoaded('car')),
            'guarantee' => new GuaranteeResource($this->whenLoaded('guarantee')),
        ];
    }

}
