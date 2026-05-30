<?php

namespace AuthCore;

use AuthCore\Console\InstallCommand;
use Illuminate\Support\ServiceProvider;

class AuthCoreServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                InstallCommand::class,
            ]);
        }
    }
}
