# ES2015 Code Coverage Examples

In this tutorial I'll walk you through setting up test coverage
for your fancy pants ES2015 JavaScript. We'll cover two topics:
instrumenting native JavaScript code, and writing backwards
compatible ES2015 code using [babel](https://github.com/babel/babel).

## ES2015 With The Babel ES2015 preset

ES6/ES2015 is composed of a [daunting array](https://babeljs.io/docs/plugins/) of JavaScript language features. Babel comes to the rescue, providing collections of plugins that
track the standardization process.

For this tutorial we will be using the [ES2015 preset](http://babeljs.io/docs/plugins/preset-es2015/), a collection of Babel plugins that
encompass many of the exciting features currently in the pipeline for JavaScript.

### Prerequisites

By relying on the preset, there are only a few dependencies that we need to add
test coverage to our ES2015 project:

```bash
npm i babel-cli babel-core babel-plugin-istanbul babel-preset-es2015 cross-env mocha chai nyc --save-dev
```

* `babel-cli`: is the command-line interface for babel; we use it during the build step.
* `babel-core`/`babel-preset-es2015`: these two libraries are all that's required to
  compile your ES2015 code.
* `babel-plugin-istanbul`: this plugin adds coverage tracking to your ES2015 code
   as it's compiled.
* `nyc`: outputs the coverage information to disk and outputs reports.
* `cross-env`: used to set `NODE_ENV=test` in a cross-platform compatible way.
* `mocha`/`chai`: the test framework that I happen to be using for this tutorial.

### Configuration

**.babelrc**

We place a `.babelrc` in the root of our project which is used by `babel-core`
to apply the compilation process:

```json
{
  "presets": [
    "es2015"
  ],
  "env": {
    "test": {
      "plugins": [
        "istanbul"
      ]
    }
  }
}
```

* `presets.es2015`: indicates that we should load the `babel-preset-es2015` set of plugins.
* `env.test.plugins.istanbul`: indicates that we should run the `babel-plugin-istanbul`
plugin, only when `NODE_ENV=test`.

_that's all there is to it!_

**package.json: configuring nyc**

```json
{"nyc": {
  "require": [
    "babel-core/register"
  ],
  "sourceMap": false,
  "instrument": false
}}
```

* `nyc.require.babel-core/register`: indicates that we should automatically run
  `require('babel-core/register')` as `nyc` loads our tests. This allows us to
   write ES2015 code in our tests without running a build step (code is automatically
   compiled by babel as it is loaded).
* `nyc.sourceMap=false`/`nyc.instrument=false`: indicates that we should not use
  `nyc` for instrumenting tests with coverage, or handling source-maps; this
  logic is instead handled by `babel` and `babel-plugin-istanbul`.

**package.json: script stanza**

```json
{"scripts": {
  "build": "babel index.js -d src",
  "test": "cross-env NODE_ENV=test nyc --reporter=lcov --reporter=text mocha test.js",
  "prepublish": "npm run build"
}}
```

* `scripts.test`:
  * `cross-env NODE_ENV=test`: sets the `NODE_ENV` environment variable, and will
    result in the `babel-plugin-istanbul` plugin being loaded.
  * `nyc --reporter=lcov --reporter=text`: indicates that nyc should be used to
     run `mocha`, and that it should output both an `lcov` and a `text` report.
  * `mocha test.js`: it doesn't get much simpler than this, use `mocha` to run
    `test.js`.
* `scripts.build`: this script uses `babel-cli` to compile your ES2015 code.
* `scripts.prepublish`: we make sure to run the build step, before publishing our
  module to npm.

### Writing Tests

### Instrumenting Your Test Code

### Shipping Your Code
