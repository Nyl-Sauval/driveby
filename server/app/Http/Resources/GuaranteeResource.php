<?php

namespace App\Http\Resources;

class GuaranteeResource extends \Illuminate\Http\Resources\Json\JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'guarantee_name' => $this->guarantee_name,
            'guarantee_price' => $this->guarantee_price,
            'guarantee_description' => $this->guarantee_description,
        ];
    }
}
