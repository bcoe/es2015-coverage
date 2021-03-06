# ES2015 Code Coverage Examples

In this tutorial I'll walk you through setting up test coverage
for your fancy pants ES2015 JavaScript projects. We'll cover two topics:
instrumenting native JavaScript code, and writing backwards
compatible ES2015 code using <a href="https://github.com/babel/babel" target="_blank">babel</a>.

For this tutorial, feel free to follow along in the repository <a href="https://github.com/bcoe/es2015-coverage" target="_blank">bcoe/es2015-coverage</a>

## ES2015 With The Babel ES2015 preset

ES6/ES2015 is composed of a <a href="https://babeljs.io/docs/plugins/" target="_blank">daunting array</a> of JavaScript language features. Babel comes to the rescue, providing collections of plugins that
track the standardization process.

For this tutorial we will be using the <a href="http://babeljs.io/docs/plugins/preset-es2015/" target="_blank">ES2015 preset</a>, a collection of Babel plugins that
encompass many of the exciting features currently in the pipeline for JavaScript.

### Prerequisites

By relying on the preset, there are only a few dependencies that we need to add
test coverage to our ES2015 project:

```bash
npm i babel-cli babel-register babel-plugin-istanbul babel-preset-es2015 cross-env mocha chai nyc --save-dev
```

* `babel-cli`: is the command-line interface for babel; we use it during the build step.
* `babel-register`: automatically compiles ES2015 JavaScript as it's required in your
   tests.
* `babel-plugin-istanbul`: this plugin adds coverage instrumentation to your ES2015 code
   as it's compiled.
* `nyc`: outputs the coverage information to disk, and handles running reports.
* `cross-env`: used to set `NODE_ENV=test` in a cross-platform compatible way.
* `mocha`/`chai`: the test framework that I happen to be using for this tutorial.

### Configuration

**.babelrc**

We place a `.babelrc` in the root of our project which is used by `babel-cli`
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
plugin only when `NODE_ENV=test`.

**package.json: configuring nyc**

```json
{"nyc": {
  "require": [
    "babel-register"
  ],
  "sourceMap": false,
  "instrument": false
}}
```

* `nyc.require.babel-register`: indicates that we should automatically run
  `require('babel-register')` as `nyc` loads our tests. This allows us to
   write ES2015 code in our tests without running a build step (code is automatically
   compiled by babel as it is loaded).
* `nyc.sourceMap=false`/`nyc.instrument=false`: indicates that we should not use
  `nyc` for instrumenting tests with coverage or handling source-maps; this
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
  * `cross-env NODE_ENV=test`: sets the `NODE_ENV` environment variable resulting in the `babel-plugin-istanbul` plugin being loaded.
  * `nyc --reporter=lcov --reporter=text`: indicates that nyc should be used to
     run `mocha`, and that it should output both an `lcov` and a `text` report.
  * `mocha test.js`: it doesn't get much simpler than this; use `mocha` to run
    `test.js`.
* `scripts.build`: this script uses `babel-cli` to compile your ES2015 code.
* `scripts.prepublish`: we automatically run the build step before publishing our
  package to npm.

### Writing Tests

Because `nyc` automatically loads `babel-register` there is no
build step necessary for your tests. Just write your tests using
ES2015 syntax and `require()` the pre-compiled ES2015 JavaScript files:

```js
import CoverageBabel from './index'

require('chai').should()

describe('CoverageBabel', () => {
  it('returns hello world message', () => {
    const cls = new CoverageBabel('Ben')
    cls.helloMessage().should.equal('hello Ben')
  })
})
```

### Shipping Your Code

When it's time to publish your code to npm, simply use `babel-cli` to compile
your ES2015 JavaScript into ES5 compatible code:

`babel index.js -d src`

This command will read in your ES2015 `./index.js` file and output the ES5
`./src/index.js` file. Only `./src/index.js` should be published to npm, which
can be achieved by adding a `files` stanza to your package.json:

```json
{"files": [
  "src/index.js"
]}
```

## Instrumenting Native ES2015 Code

If you're using newer versions's of Node.js various ES2015 features are already
supported. <a href="http://node.green/" target="_blank">node.green</a> provides
a useful chart for viewing compatibility information.

nyc uses the same parser underneath the hood as babel and understands native
ES2015 constructs; with zero configuration you can start instrumenting your ES2015 code!

```json
{"scripts": {
  "test": "nyc --reporter=text --reporter=lcov mocha test.js"
}}
```
