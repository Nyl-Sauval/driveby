<?php

namespace App\Mail;

use App\Models\Location;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RetourValidated extends Mailable
{
    use Queueable, SerializesModels;

    public $location;

    public function __construct(Location $location)
    {
        $this->location = $location;
    }

    public function build()
    {
        return $this->subject('Retour du véhicule effectué !')
            ->view('emails.retour-effectue');
    }
}
