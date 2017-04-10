#!/usr/bin/env node
const Now = require('now-client');

function main(filter) {
  const now = Now(process.env.NOW_TOKEN);

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
  main(process.argv[2] || null).then(res => console.log(JSON.stringify(res))).catch(e => console.error(e));
}
