# now-no-alias

A utility to dump out in JSON all the zeit now instances that aren't linked to aliases.

Suggested usage with [json](https://www.npmjs.com/package/json) CLI tool:

```bash
$ now rm $(now-no-alias | json -a uid)
sD6BY8cWbUWUrznpMHMDG5Ag                 https://loader-rnlmdatsjn.now.sh      5m ago
...etc
> Are you sure? [y/N] y
> Success! [1s]
```


You may optionally provide a `token` to interact with other `now` accounts:

```bash
$ now --token=bZ93foNN1hRQDZ26qPRWAqDX
```
