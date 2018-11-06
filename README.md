# valirator

Powerful javascript by schema validation tool

[![npm version][npm-image]][npm-url] [![Bower version][bower-image]][bower-url] [![Downloads][downloads-image]][downloads-url]

[![GitHub issues][github-image]][github-url] [![Travis status][travis-image]][travis-url] [![CircleCI status][circleci-image]][circleci-url]

[![Dependency status][david-image]][david-url] [![devDependency status][david-dev-image]][david-dev-url]

[![Summary status][nodei-image]][nodei-url]

## Quick start

Several quick start options are available:

- [Download the latest release][download-url]
- Clone the repo: `git clone https://github.com/massive-angular/valirator.git`
- Install with [npm][npm-url]: `npm install valirator --save`
- Install with [bower][bower-url]: `bower install valirator --save`

## Documentation

For documentation please follow: https://massive-angular.github.io/valirator/

## Usage

```javascript
import { validate } from 'valirator';

const validationResult = await validate(schema, obj);
```

## Schema Examples

### Simple schema

```javascript
const schema = {
  Email: {
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  Password: {
    required: true,
    minLength: 3,
    maxLength: 50,
  },
};
```

### Nested schema

```javascript
const schema = {
  Person: {
    FirstName: {
      required: true,
      maxLength: 50,
    },
    LastName: {
      required: true,
      maxLength: 50,
    },
    Email: {
      required: true,
      format: 'email',
    },
  },
};
```

### Array schema

```javascript
const schema = {
  Employees: {
    rules: {
      required: true,
      minItems: 5,
    },
    properties: {
      FirstName: {
        required: true,
        maxLength: 50,
      },
      LastName: {
        required: true,
        maxLength: 50,
      },
      Email: {
        required: true,
        format: 'email',
      },
    },
    messages: {
      required: 'Please fill %{property}',
    },
  },
};
```

## Creators

**Alexandr Dascal**

- [https://github.com/adascal](https://github.com/adascal)

**Slava Matvienco**

- [https://github.com/wfm-slava](https://github.com/wfm-slava)

## License

Code released under [the MIT license](http://spdx.org/licenses/MIT).

[npm-url]: https://npmjs.com/package/valirator
[npm-image]: https://img.shields.io/npm/v/valirator.svg
[bower-url]: https://bower.io/search/?q=valirator
[bower-image]: https://img.shields.io/bower/v/valirator.svg
[github-url]: https://github.com/massive-angular/valirator/issues
[github-image]: https://img.shields.io/github/issues/massive-angular/valirator.svg
[travis-url]: https://travis-ci.org/massive-angular/valirator
[travis-image]: https://img.shields.io/travis/massive-angular/valirator/master.svg
[circleci-url]: https://circleci.com/gh/massive-angular/valirator
[circleci-image]: https://img.shields.io/circleci/project/massive-angular/valirator/master.svg
[david-url]: https://david-dm.org/massive-angular/valirator
[david-image]: https://img.shields.io/david/massive-angular/valirator.svg
[david-dev-url]: https://david-dm.org/massive-angular/valirator?type=dev
[david-dev-image]: https://img.shields.io/david/dev/massive-angular/valirator.svg
[nodei-url]: https://npmjs.com/package/valirator
[nodei-image]: https://nodei.co/npm/valirator.svg?downloads=true&downloadRank=true&stars=true
[download-url]: https://github.com/massive-angular/valirator/archive/v2.0.3.zip
[downloads-url]: https://npmjs.com/package/valirator
[downloads-image]: https://img.shields.io/npm/dm/valirator.svg
