# now-no-alias

A utility to dump out in JSON all the zeit now instances that aren't linked to aliases.

Suggested usage with [json](https://www.npmjs.com/package/json) CLI tool:

```
$ now rm $(now-no-alias | json -a uid)
sD6BY8cWbUWUrznpMHMDG5Ag                 https://loader-rnlmdatsjn.now.sh      5m ago
...etc
> Are you sure? [y/N] y
> Success! [1s]
```

Node use:

```
const nowNoAlias = require('now-no-alias')
// optional: you can set your Now token
// process.env.NOW_TOKEN = 'YOUR_TOKEN'
nowNoAlias().then(deployments => console.log(deployments))
```
