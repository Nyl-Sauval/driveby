<?php

namespace App\Http\Resources;

class CarResource extends \Illuminate\Http\Resources\Json\JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'brand' => $this->car_brand,
            'registration' => $this->car_registration,
            'model' => $this->car_model,
            'fuel' => $this->car_fuel,
            'mileage' => $this->car_mileage,
            'picture' => $this->car_picture,
            'price' => $this->car_price,
            'default' => $this->car_default,
            'agency' => new AgencyResource($this->whenLoaded('agency')),
            'categories' => CategoryResource::collection($this->whenLoaded('categories')),
        ];
    }

}
