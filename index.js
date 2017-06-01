#!/usr/bin/env node
const Now    = require('now-client');
var minimist = require('minimist');


function main(filter, token) {
  const now = new Now(token);

  return Promise.all([
    now.getAliases(),
    now.getDeployments()
  ]).then(([ aliases, deployments ]) =>
    deployments.filter(deploy =>
      !aliases.find(alias =>
        alias.deploymentId === deploy.uid
      ) && (
        !filter || filter === deploy.name
      )
    )
  );
}

module.exports = main;

if (!module.parent) {
  var argv = minimist(process.argv.slice(2));

  main(argv._[0], argv.token).then(res => console.log(JSON.stringify(res))).catch(e => console.error(e));
}
