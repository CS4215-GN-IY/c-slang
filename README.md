# c-slang

[![Coverage Status](https://coveralls.io/repos/github/CS4215-GN-IY/c-slang/badge.svg?branch=master)](https://coveralls.io/github/CS4215-GN-IY/c-slang?branch=master)

An interpreter for C that is implemented in TypeScript.

# Getting Started

1. Install nodenv by following the instructions [here](https://github.com/nodenv/nodenv#installation).
   Then, install the version of Node specified in the `.node-version` file.
   ```sh
   nodenv install $(cat .node-version)
   ```
1. Install Yarn for dependency management.
   ```sh
   npm install --global yarn
   ```
1. Install the project dependencies.
   ```sh
   yarn install
   ```

# Usage

The interpreter can be used as either a standalone read-eval-print loop (REPL) or as a package.

## REPL

1. Build the project.
   ```sh
   yarn build
   ```
1. To start the REPL, run:
   ```sh
   node dist/repl/repl.js
   ```

## Package

1. Add c-slang as a dependency via this repository:
   ```sh
   yarn add https://github.com/CS4215-GN-IY/c-slang
   ```

# Testing

The test suite can be run via the command:
```sh
yarn test
```
