<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Session extends Model
{
    protected $table = 'sessions';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $hidden = ['payload'];

    protected $appends = [
        'is_this_device',
        'platform',
        'browser',
        'is_desktop',
        'last_activity_humans',
    ];

    public function getIsThisDeviceAttribute(): bool
    {
        return $this->id === request()->session()->getId();
    }

    public function getPlatformAttribute(): string
    {
        return $this->parseUserAgent()['platform'] ?? 'Unknown';
    }

    public function getBrowserAttribute(): string
    {
        return $this->parseUserAgent()['browser'] ?? 'Unknown';
    }

    public function getIsDesktopAttribute(): bool
    {
        return $this->parseUserAgent()['is_desktop'] ?? true;
    }

    public function getLastActivityHumansAttribute(): string
    {
        return Carbon::createFromTimestamp($this->last_activity)->diffForHumans();
    }

    private function parseUserAgent(): array
    {
        $ua = $this->user_agent ?? '';

        $isDesktop = ! preg_match('/(mobile|android|iphone|ipad|ipod|tablet)/i', $ua);

        $browser = 'Unknown';
        if (preg_match('/Firefox\/(\d+)/i', $ua)) {
            $browser = 'Firefox';
        } elseif (preg_match('/Edg\/(\d+)/i', $ua)) {
            $browser = 'Edge';
        } elseif (preg_match('/Chrome\/(\d+)/i', $ua)) {
            $browser = 'Chrome';
        } elseif (preg_match('/Safari\/(\d+)/i', $ua)) {
            $browser = 'Safari';
        } elseif (preg_match('/Opera|OPR\//i', $ua)) {
            $browser = 'Opera';
        }

        $platform = 'Unknown';
        if (preg_match('/Windows NT/i', $ua)) {
            $platform = 'Windows';
        } elseif (preg_match('/Mac OS X/i', $ua)) {
            $platform = 'macOS';
        } elseif (preg_match('/Linux/i', $ua) && ! preg_match('/Android/i', $ua)) {
            $platform = 'Linux';
        } elseif (preg_match('/Android/i', $ua)) {
            $platform = 'Android';
        } elseif (preg_match('/iPhone|iPad|iPod/i', $ua)) {
            $platform = 'iOS';
        } elseif (preg_match('/Ubuntu/i', $ua)) {
            $platform = 'Ubuntu';
        }

        return [
            'is_desktop' => $isDesktop,
            'platform' => $platform,
            'browser' => $browser,
        ];
    }
}
