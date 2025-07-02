<?php
namespace App\Jobs;

use App\Mail\RetraitValidated;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendRetraitEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $location;

    public function __construct($location)
    {
        $this->location = $location;
    }

    public function handle()
    {

        Mail::to($this->location->client->client_email)
            ->send(new RetraitValidated($this->location));
    }
}
