;(function (chalk, yaml) {
  module.exports = {
    error (e) {
      console.error(chalk.red.bold(e))
      process.exit(1)
    },
    log (s) {
      console.log(chalk.cyan(s))
    },
    parse (e) {
      return new Promise((resolve, reject) => {
        try {
          resolve(yaml.load(e))
        } catch (error) {
          reject(error)
        }
      })
    }
  }
})(require('chalk'), require('js-yaml'));
