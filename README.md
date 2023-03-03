# c-slang

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

1. To build,
   ```sh
   yarn build
   ```
1. Add \"c-slang\" to your PATH
   ```sh
   cd dist
   yarn link
   ```
1. To start the repl, run
   ```sh
   c-slang
   ```
   Or if you did not do step 2, run
   ```sh
   node dist/repl/repl.js
   ```
