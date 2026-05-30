# AuthCore — Laravel Authentication Starter Kit

A production-ready Laravel authentication starter kit with **Inertia + React**, **social login**, **role-based access control**, **passwordless authentication**, and a full **admin user management panel**.

Built with the **Gruvbox Dark** theme and full **RTL (Arabic)** UI support.

## Features

- **Authentication**: Login, registration, email verification (OTP), password reset, passwordless magic links
- **Social Login**: Google, GitHub, Facebook via Laravel Socialite (with approval workflow)
- **Role-Based Access**: Student, Teacher, Department Head, Admin roles with granular permissions
- **User Approval**: Admins approve/reject/suspend/activate user accounts
- **Admin Panel**: User management, role CRUD, pending approval queue
- **Passwordless Auth**: Magic link login via email
- **Session Management**: View and revoke active sessions from profile
- **Security**: Rate-limited auth endpoints, hashed reset tokens, production-ready defaults
- **UI**: Gruvbox Dark theme, RTL Arabic layout, responsive sidebar navigation

## Requirements

- PHP ^8.3
- Node.js 22+
- SQLite (default) or MySQL/PostgreSQL

## Quick Start

```bash
composer create-project eyadcsdev/auth-core my-app

cd my-app

# (Optional) Configure .env — social login keys, mail driver, etc.

php artisan serve
```

Visit `http://localhost:8000/register` to create the first account.

> **Note**: The first user to register automatically becomes the admin. Default registration requires admin approval.

## Post-Installation

### Social Login (Optional)

Configure OAuth credentials in `.env`:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
```

### Mail Driver (for password reset, OTP, magic links)

```env
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
```

### Development Server

```bash
composer run dev
```

This runs the PHP server, queue worker, logs, and Vite hot-reload concurrently.

### Running Tests

```bash
php artisan test --compact
```

## Screenshots

> *Coming soon*

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Laravel 13 |
| Frontend | React 19 + Inertia.js 3 |
| Styling | Tailwind CSS 4 |
| Auth | Laravel Socialite + custom approval workflow |
| Database | SQLite (default), MySQL/PostgreSQL compatible |
| Testing | Pest + PHPUnit |
| CI | GitHub Actions (tests + linter) |

## Security

- Password reset tokens are hashed before storage
- Rate limiting on all auth endpoints (5 attempts per minute)
- OAuth credentials are never committed to the repository
- Session management with device tracking
- Permission-based middleware for all admin routes

## License

AuthCore is open-sourced software licensed under the [MIT license](LICENSE).
