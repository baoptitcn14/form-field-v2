# BuildFormField

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## ============================== begin Bao comment ==============================

## package need install

"@popperjs/core": "^2.11.6"
"bootstrap": "^4.6.2",
"font-awesome": "^4.7.0"
"jquery": "^3.6.1"
"ngx-image-compress": "^13.1.13"

## command need run

ng add @angular/material -> yes -> yes

## import module
import FormFieldModule into app.module

## import css, js into angular.json file

"styles": [
    "./node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css",
    "node_modules/font-awesome/css/font-awesome.min.css",
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    ...
    "src/styles.scss"
],
"scripts": [
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/@popperjs/core/dist/umd/popper.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.min.js",
    ...
    "./src/assets/app.js"
]

## copy style into style.scss

.highlighted-text {
    background-color: violet;

    span:not(:has(.highlighted-text)) {
        background-color: #ffffff;
    }
}

## ============================== end Bao comment ==============================
