import CoverageBabel from './index'

require('chai').should()

describe('CoverageBabel', () => {
  it('returns hello world message', () => {
    const cls = new CoverageBabel('Ben')
    cls.helloMessage().should.equal('hello Ben')
  })

  it('defaults name to batman', () => {
    const cls = new CoverageBabel()
    cls.helloMessage().should.equal('hello batman')
  })
})
