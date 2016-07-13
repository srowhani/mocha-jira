#!/usr/bin/env node
/**
 * @author Seena Rowhani
 * @description Auto-generate test scaffolding using JIRA
 */
;(function (program, Jira, utils, package) {
  /**
   * [parse description]
   * @param  {[type]} comment [description]
   * @return {[type]}         [description]
   */
  let parse = function (comment) {
    let body = comment.body
    utils
      .parse(body)
      .then(object => {

      }).catch(utils.error)
  }
  ;(init => {
    program
      .version(package.version)
      .option('-i, --issue <value>', 'Issue Key (REQUIRED)')
      .option('--host <value>', 'Jira Host (OPTIONAL)')
      .option('-u, --username <value>', 'Jira Username (REQUIRED)')
      .option('-p, --password <value>', 'Jira Password (REQUIRED)')
      .parse(process.argv)
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
      comments.forEach(parse)
    }).catch(e => {
      utils.error(e)
    })

})(
  require('commander'),
  require('jira-client'),
  require('./utils/util'),
  require('./package.json')
);
