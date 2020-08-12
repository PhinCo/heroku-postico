heroku-postico
==============

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/heroku-postico.svg)](https://npmjs.org/package/heroku-postico)
[![Downloads/week](https://img.shields.io/npm/dw/heroku-postico.svg)](https://npmjs.org/package/heroku-postico)
[![License](https://img.shields.io/npm/l/heroku-postico.svg)](https://github.com/PhinCo/heroku-postico/blob/master/package.json)

Tools to make using Heroku postgres databases with Postico easier.

* [Installation](#installation)
* [Commands](#commands)
* [Developing](#developing)

# Installation

```sh-session
INSTALLATION
  $ npm install -g @connectedyard/heroku-postico
  $ heroku plugins:install @connectedyard/heroku-postico
  $ heroku postico
```

# Commands

## `heroku postico:open`

Fetch Heroku postgres databases for a team to choose from a list and connect in Postico.

```sh-session
USAGE
  $ heroku postico:open --team=[your heroku team]
```

![](readme-assets/postico-open-small.gif)


## `heroku postico:export`

Export a folder containing Postico favorite files for all Heroku postgres databases associated with a team.

```sh-session
USAGE
  $ heroku postico:export --team=[your heroku team]
```

![](readme-assets/postico-export-small.gif)

Once the favorites are exported, drag & drop the folder onto the postico favorites window. Be sure to delete the exported 
favorites folder permanently after importing to prevent leaking your passwords.


# Developing

1. Clone the repo.
2. CD into the repo and Link the heroku cli to your local working copy: `heroku plugins:link`.
3. Make your edits and test your changes by running `heroku postico` as you normally would.
