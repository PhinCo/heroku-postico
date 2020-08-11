heroku-postico
==============

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/heroku-postico.svg)](https://npmjs.org/package/heroku-postico)
[![Downloads/week](https://img.shields.io/npm/dw/heroku-postico.svg)](https://npmjs.org/package/heroku-postico)
[![License](https://img.shields.io/npm/l/heroku-postico.svg)](https://github.com/PhinCo/heroku-postico/blob/master/package.json)

* [Usage](#usage)
* [Commands](#commands)

# Usage
```sh-session
$ npm install -g @connectedyard/heroku-postico
$ heroku plugins:install @connectedyard/heroku-postico
$ heroku postico
```

# Commands

## `heroku postico:open`

Fetch a list of Heroku postgres databases for a team and connect in Postico.

```
USAGE
  $ heroku postico:open --team=[your heroku team]
```