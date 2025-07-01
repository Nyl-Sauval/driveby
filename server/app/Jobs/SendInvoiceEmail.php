<?php
namespace App\Jobs;

use App\Mail\InvoiceMail;
use App\Mail\ReservationCreated;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Barryvdh\DomPDF\Facade\Pdf;

class SendInvoiceEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $location;
    protected $agency;

    public function __construct($location, $agency)
    {
        $this->location = $location;
        $this->agency = $agency;
    }

    public function handle()
    {
        $pdf = Pdf::loadView('invoices.facture', [
            'location' => $this->location,
            'agency' => $this->agency
        ]);

        Mail::to($this->location->client->client_email)
            ->send(new ReservationCreated($this->location, $this->agency, $pdf->output()));
    }
}
