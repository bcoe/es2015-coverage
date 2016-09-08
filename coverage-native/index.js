"use strict";

class CoverageNative {
  constructor (name='batman') {
    this.name = name
  }

  helloMessage () {
    let msg = `hello ${this.name}`
    return msg
  }

  sayHello () {
    console.log(this.helloMessage())
  }
}

module.exports = CoverageNative
