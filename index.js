#!/usr/bin/env node

'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Now = require('now-client');
var minimist = require('minimist');

function main(filter, token) {
  var now = new Now(token);

  return _promise2.default.all([now.getAliases(), now.getDeployments()]).then(function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        aliases = _ref2[0],
        deployments = _ref2[1];

    return deployments.filter(function (deploy) {
      return !aliases.find(function (alias) {
        return alias.deploymentId === deploy.uid;
      }) && (!filter || filter === deploy.name);
    });
  });
}

module.exports = main;

if (!module.parent) {
  var argv = minimist(process.argv.slice(2));

  main(argv._[0], argv.token).then(function (res) {
    return console.log((0, _stringify2.default)(res));
  }).catch(function (e) {
    return console.error(e);
  });
}