;(function (chalk, yaml, Handlebars, package) {
  module.exports = {
    package,
    init (program) {
      this.config = program
    },
    error (err) {
      console.error(chalk.red.bold(err))
      process.exit(1)
    },
    log (msg) {
      console.log(chalk.cyan(msg))
    },
    debug (msg) {
      if (this.config.debug) {
        this.log(`DEBUG: ${msg}`)
      }
    },
    parse (obj) {
      try {
        return yaml.load(obj.body)
      } catch (error) {
        return false
      }
    },
    validate (el) {
      return !el ?
        false :
        /Acceptance Criteria/.test(Object.keys(el)[0])
    },
    compile (data) {
      return Handlebars.compile(require('./template'))(data)
    }
  }
})(
  require('chalk'),
  require('js-yaml'),
  require('handlebars'),
  require('../package.json')
);
