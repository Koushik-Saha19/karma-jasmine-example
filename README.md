# karma-jasmine-example

Example app (Todo app from [Backbone.js](http://backbonejs.org/) examples) covered with unit tests featuring:

* [Karma](http://karma-runner.github.io/)
* [Jasmine](http://jasmine.github.io/)
* [Sinon.JS](http://sinonjs.org/)
* [js-factories](https://github.com/matthijsgroen/js-factories)
* [jasmine-jquery](https://github.com/velesin/jasmine-jquery)
* [Page Objects](http://martinfowler.com/bliki/PageObject.html)

## Running the app

Install the modules:

```
npm install
```

Compile the templates:

```
gulp
```

Start the server:


```
gulp server
```

Point your browser to: http://localhost:8000/index.html

## Running the tests

Run once:

```
gulp test
```

Run in watch mode:

```
gulp tdd
```

## Folder structure

* __app__: The app code.
* __test__: The tests code.
  * __factories__: Factories definitions (using js-factories). 
  * __pages__: Page Objects definitions.
  * __routes__: Routes (mocked urls and responses using Sinon.JS).
  * __specs__: The specs (tests definitions using Jasmine).
  * __support__: Support code for the tests.