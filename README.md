# Laravel-Vue


## Features

- Laravel 8
- Vue + VueRouter + Vuex + VueAxios
- Pages with dynamic import and custom layouts
- Vue Bootstrap

## Installation

-  `copy .env.example to .env`
- `composer install`
- `php artisan key:generate`
- `php artisan migrate:fresh --seed`
- `npm install`

## Usage

#### Development

```bash
# Build and watch
npm run watch
```

#### Production

```bash
npm run production
```

## Start

```bash
php artisan config:cache
php artisan serve --port=3000
```
