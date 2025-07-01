<?php

namespace App\Mail;

use App\Models\Location;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReservationCreated extends Mailable
{
    use Queueable, SerializesModels;

    public $location;

    public function __construct(Location $location, $agency, $pdfContent)
    {
        $this->location = $location;
        $this->agency = $agency;
        $this->pdfContent = $pdfContent;
    }

    public function build()
    {
        return $this->subject('Confirmation de location')
            ->view('emails.reservation_created')
            ->attachData(
                $this->pdfContent,
                'facture.pdf',
                [
                    'mime' => 'application/pdf',
                ]
            );
    }
}
