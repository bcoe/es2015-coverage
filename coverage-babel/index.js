class CoverageBabel {
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

export default CoverageBabel
