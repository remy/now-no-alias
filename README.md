# now-no-alias
A utility to list all the zeit now instances that aren't linked to aliases to JSON.

## Installation

```shell
npm install -g now-no-alias
```

## Example output
```json
[
  {
    "uid": "rgomnt4USrdCZGisSVSbf6oS",
    "name": "my-app.now",
    "url": "deploynow-ytgjuhoeut.now.sh",
    "created": "1486815034444"
  }
]
```

## Suggested usage 
- Remove all Now instances without an alias with [json](https://www.npmjs.com/package/json) CLI tool

```
$ now rm $(now-no-alias | json -a uid)
sD6BY8cWbUWUrznpMHMDG5Ag                 https://loader-rnlmdatsjn.now.sh      5m ago
...etc
> Are you sure? [y/N] y
> Success! [1s]
```
