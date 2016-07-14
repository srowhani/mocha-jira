#!/usr/bin/env node
/**
 * @author Seena Rowhani
 * @description Auto-generate test scaffolding using JIRA
 */
;(function (program, Jira, utils) {
  ;(init => {
    program
      .version(utils.package.version)
      .option('-i, --issue <value>', 'Issue Key (REQUIRED)')
      .option('--host <value>', 'Jira Host (OPTIONAL)')
      .option('-u, --username <value>', 'Jira Username (REQUIRED)')
      .option('-p, --password <value>', 'Jira Password (REQUIRED)')
      .option('-d, --debug', 'debug mode')
      .parse(process.argv)
    utils.init(program)
  })();
  let jira = new Jira({
    protocol: 'https',
    host: program.host || process.env.JIRA_HOST,
    username: program.username || process.env.JIRA_USER,
    password: program.password || process.env.JIRA_PASS,
    apiVersion: '2',
    strictSSL: true
  });

  jira.findIssue('BPSO-25131')
    .then(issue => {
      let comments = issue.fields.comment.comments
      comments
        .map(utils.parse)
        .filter(utils.validate)
        .forEach(comment => {
          //TODO parse comment, compile
          let testName = Object.keys(comment)[0]
          let compiled = utils.compile({
            dasherizedName: 'lorem-ipsum',
            titleCaseName: 'LoremIpsumTest'
          })
          utils.debug(compiled)
        })
    }).catch(utils.error)

})(
  require('commander'),
  require('jira-client'),
  require('./utils/util')
);
