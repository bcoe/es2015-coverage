const CoverageNative = require('./')

require('chai').should()

describe('CoverageNative', () => {
  it('returns hello world message', () => {
    const cls = new CoverageNative('Ben')
    cls.helloMessage().should.equal('hello Ben')
  })

  it('defaults name to batman', () => {
    const cls = new CoverageNative()
    cls.helloMessage().should.equal('hello batman')
  })
})
