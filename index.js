#!/usr/bin/env node

/**
 * @author Seena Rowhani
 * @description Auto-generate test scaffolding using JIRA
 */
;(function (program, Jira, chalk, package) {
  ;(function init () {
    if (process.argv.length < 3)
      throw Error('No arguments were supplied. Try `-h` for help.')
    program
      .version(package.version)
      .option('-i, --issue <value>', 'Issue Key (REQUIRED)')
      .option('--host <value>', 'Jira Host (OPTIONAL)')
      .option('-u, --username <value>', 'Jira Username (REQUIRED)')
      .option('-p, --password <value>', 'Jira Password (REQUIRED)')
      .parse(process.argv)
    if (!program.issue) {
      throw Error('Issue Key (-i) must be specified')
    }
  })();

  var jira = new Jira({
    protocol: 'https',
    host: 'jira.somehost.com',
    username: 'username',
    password: 'password',
    apiVersion: '2',
    strictSSL: true
  });


})(
  require('commander'),
  require('jira-client'),
  require('chalk'),
  require('./package.json')
);
