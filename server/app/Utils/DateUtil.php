<?php

namespace App\Utils;

use Illuminate\Support\Facades\Date;

class DateUtil
{
    public const DEFAULT_DATE_PATTERN = 'd-m-Y';
    public const DEFAULT_DATE_TIME_PATTERN = 'd-m-Y H:i:s';

    /**
     * Format a date to string $pattern
     * @param string $date
     * @param string $pattern
     */
    public static function formatDate(string $date, string $pattern = self::DEFAULT_DATE_PATTERN): string
    {
        return Date::parse($date)->format($pattern);
    }

    /**
     * Get the current date in 'Y-m-d' format.
     *
     * @return string
     */
    public static function getCurrentDate(): string
    {
        return Date::now()->format('Y-m-d');
    }

}
