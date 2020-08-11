heroku-postico
==============

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/heroku-postico.svg)](https://npmjs.org/package/heroku-postico)
[![Downloads/week](https://img.shields.io/npm/dw/heroku-postico.svg)](https://npmjs.org/package/heroku-postico)
[![License](https://img.shields.io/npm/l/heroku-postico.svg)](https://github.com/PhinCo/heroku-postico/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
<!-- usage -->
```sh-session
$ npm install -g heroku-postico
$ heroku-postico COMMAND
running command...
$ heroku-postico (-v|--version|version)
heroku-postico/0.0.1 darwin-x64 node-v12.11.1
$ heroku-postico --help [COMMAND]
USAGE
  $ heroku-postico COMMAND
...
```
<!-- usagestop -->

# Commands
<!-- commands -->
* [`heroku-postico postico:open`](#heroku-postico-posticoopen)

## `heroku-postico postico:open`

Fetch a list of Heroku postgres databases for a team and connect in Postico

```
USAGE
  $ heroku-postico postico:open

OPTIONS
  -t, --team=team  (required) team to use
  --verbose        Enable extra debug output.

DESCRIPTION
  ...
```

_See code: [src/commands/postico/open.js](https://github.com/PhinCo/heroku-postico/blob/v0.0.1/src/commands/postico/open.js)_
<!-- commandsstop -->
