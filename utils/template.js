module.exports = `
  import chai from 'chai'
  const expect = chai.expect
  import sinon from 'sinon'
  import {
    describeComponent
  } from 'ember-mocha'
  import {
    beforeEach,
    afterEach,
    it
  } from 'mocha'

  describeComponent(
    '{{dasherizedName}}',
    '{{titleCaseName}}', {
      acceptance: true
    },
    function () {
      let component, sandbox

      beforeEach(function () {
        component = this.subject()
        sandbox = sinon.sandbox.create()
      })

      afterEach(function () {
        sandbox.restore()
      })

    }
  )
`
