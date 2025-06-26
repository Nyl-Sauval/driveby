<?php

namespace App\Http\Resources;

class CategoryResource extends \Illuminate\Http\Resources\Json\JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->category_name,
            'description' => $this->category_description,
        ];
    }
}
