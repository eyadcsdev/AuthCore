<?php

namespace AuthCore\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;
use RuntimeException;

class InstallCommand extends Command
{
    protected $signature = 'auth-core:install
        {--composer=global : The Composer binary to use}
        {--force : Overwrite existing files without asking}';

    protected $description = 'Install AuthCore authentication scaffolding';

    public function handle(): int
    {
        $this->components->info('Installing AuthCore authentication scaffolding...');

        // 1. Validate environment
        if (! $this->isLaravelProject()) {
            $this->components->error('This command must be run from the root of a Laravel project.');

            return Command::FAILURE;
        }

        // 2. Publish files
        $this->publishFiles();

        // 3. Install PHP dependencies
        $this->installPhpDependencies();

        // 4. Install frontend dependencies
        $this->installNodeDependencies();

        // 5. Run migrations
        $this->runMigrations();

        // 6. Provide next steps
        $this->displayNextSteps();

        return Command::SUCCESS;
    }

    protected function isLaravelProject(): bool
    {
        return file_exists(base_path('artisan'));
    }

    protected function publishFiles(): void
    {
        $this->components->task('Publishing controllers and middleware', function () {
            $this->copyDirectory(__DIR__.'/../../stubs/app/Http/Controllers', app_path('Http/Controllers'));
            $this->copyDirectory(__DIR__.'/../../stubs/app/Http/Middleware', app_path('Http/Middleware'));
            $this->copyDirectory(__DIR__.'/../../stubs/app/Http/Requests', app_path('Http/Requests'));
        });

        $this->components->task('Publishing models, enums, and services', function () {
            $this->copyDirectory(__DIR__.'/../../stubs/app/Models', app_path('Models'));
            $this->copyDirectory(__DIR__.'/../../stubs/app/Enums', app_path('Enums'));
            $this->copyDirectory(__DIR__.'/../../stubs/app/Mail', app_path('Mail'));
            $this->copyDirectory(__DIR__.'/../../stubs/app/Policies', app_path('Policies'));
            $this->copyDirectory(__DIR__.'/../../stubs/app/Services', app_path('Services'));
        });

        $this->components->task('Publishing configuration', function () {
            $this->copyDirectory(__DIR__.'/../../stubs/config', config_path());
        });

        $this->components->task('Publishing migrations and seeders', function () {
            $this->copyDirectory(__DIR__.'/../../stubs/database/migrations', database_path('migrations'));
            $this->copyDirectory(__DIR__.'/../../stubs/database/seeders', database_path('seeders'));
        });

        $this->components->task('Publishing frontend assets', function () {
            $this->copyDirectory(__DIR__.'/../../stubs/resources/js', resource_path('js'));
            $this->copyDirectory(__DIR__.'/../../stubs/resources/css', resource_path('css'));
            $this->copyFile(__DIR__.'/../../stubs/vite.config.ts', base_path('vite.config.ts'));
        });

        $this->components->task('Publishing routes', function () {
            $this->copyFile(__DIR__.'/../../stubs/routes/auth.php', base_path('routes/auth.php'));
        });

        $this->components->task('Publishing tests', function () {
            $this->copyDirectory(__DIR__.'/../../stubs/tests', base_path('tests'));
        });

        $this->components->task('Updating bootstrap/app.php', function () {
            $this->copyFile(__DIR__.'/../../stubs/bootstrap/app.php', base_path('bootstrap/app.php'));
        });

        $this->components->task('Updating AppServiceProvider', function () {
            $this->copyFile(
                __DIR__.'/../../stubs/app/Providers/AppServiceProvider.php',
                app_path('Providers/AppServiceProvider.php'),
            );
        });

        $this->components->task('Including auth routes in web.php', function () {
            $this->appendToFile(
                base_path('routes/web.php'),
                PHP_EOL.PHP_EOL.'require __DIR__.\'/auth.php\';'.PHP_EOL,
            );
        });
    }

    protected function installPhpDependencies(): void
    {
        $this->components->task('Installing PHP dependencies', function () {
            $this->runComposer([
                'require',
                'inertiajs/inertia-laravel:^3.0',
                'laravel/socialite:^5.26',
                'laravel/wayfinder:^0.1',
                'tightenco/ziggy:^2.6',
            ]);
        });
    }

    protected function installNodeDependencies(): void
    {
        $this->components->task('Installing Node dependencies', function () {
            $packages = [
                '@inertiajs/react',
                '@inertiajs/vite',
                '@laravel/vite-plugin-wayfinder',
                '@tailwindcss/vite',
                '@vitejs/plugin-react',
                'autoprefixer',
                'laravel-vite-plugin',
                'react',
                'react-dom',
                'tailwindcss',
                'ziggy-js',
            ];

            $this->runNodeCommand('npm install '.implode(' ', $packages).' --save');
            $this->runNodeCommand('npm install --save-dev @types/react @types/react-dom babel-plugin-react-compiler');
        });

        $this->components->task('Building frontend assets', function () {
            $this->runNodeCommand('npm run build');
        });
    }

    protected function runMigrations(): void
    {
        $this->components->task('Running migrations and seeders', function () {
            $this->call('migrate', ['--force' => true]);
            $this->call('db:seed', ['--class' => 'PermissionSeeder', '--force' => true]);
            $this->call('db:seed', ['--class' => 'RoleSeeder', '--force' => true]);
        });
    }

    protected function displayNextSteps(): void
    {
        $this->newLine();
        $this->components->info('AuthCore has been installed successfully!');
        $this->newLine();
        $this->components->bulletList([
            'Register at: '.url('/register'),
            'Login at: '.url('/login'),
            'Configure social login in your .env file',
            'Run php artisan serve to start the development server',
        ]);
        $this->newLine();
    }

    protected function copyDirectory(string $from, string $to): void
    {
        if (! is_dir($from)) {
            return;
        }

        $this->ensureDirectoryExists($to);

        $items = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($from, \RecursiveDirectoryIterator::SKIP_DOTS),
            \RecursiveIteratorIterator::SELF_FIRST,
        );

        foreach ($items as $item) {
            $target = $to.'/'.$items->getSubPathname();

            if ($item->isDir()) {
                $this->ensureDirectoryExists($target);
            } else {
                if (file_exists($target) && ! $this->option('force')) {
                    continue;
                }
                copy((string) $item, $target);
            }
        }
    }

    protected function copyFile(string $from, string $to): void
    {
        if (! file_exists($from)) {
            return;
        }

        $this->ensureDirectoryExists(dirname($to));

        if (file_exists($to) && ! $this->option('force')) {
            return;
        }

        copy($from, $to);
    }

    protected function appendToFile(string $path, string $content): void
    {
        if (! file_exists($path)) {
            return;
        }

        $existing = file_get_contents($path);

        if (str_contains($existing, trim($content))) {
            return;
        }

        file_put_contents($path, $existing.$content, LOCK_EX);
    }

    protected function ensureDirectoryExists(string $path): void
    {
        if (! is_dir($path)) {
            mkdir($path, 0755, true);
        }
    }

    protected function runComposer(array $arguments): void
    {
        $command = array_merge([$this->findComposer()], $arguments);

        $process = Process::path(base_path())->run(implode(' ', array_map('escapeshellarg', $command)));

        if (! $process->successful()) {
            throw new RuntimeException('Failed to install Composer dependencies: '.$process->errorOutput());
        }
    }

    protected function runNodeCommand(string $command): void
    {
        $process = Process::path(base_path())->run($command);

        if (! $process->successful()) {
            throw new RuntimeException('Failed to run Node command: '.$command.PHP_EOL.$process->errorOutput());
        }
    }

    protected function findComposer(): string
    {
        $composer = $this->option('composer');

        if ($composer !== 'global') {
            return $composer;
        }

        if (PHP_OS_FAMILY === 'Windows') {
            return 'composer';
        }

        $binary = exec('which composer 2>/dev/null');

        return $binary ?: 'composer';
    }
}
