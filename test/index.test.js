'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var tap = require('tap');
var test = tap.test;
var sinon = require('sinon');
var spies = {
  getAliases: null,
  getDeployments: null
};

var proxyquire = require('proxyquire');
var main = proxyquire('../', {
  'now-client': function nowClient() {
    return {
      getDeployments: function getDeployments() {
        return _promise2.default.resolve(spies.getDeployments());
      },
      getAliases: function getAliases() {
        return _promise2.default.resolve(spies.getAliases());
      }
    };
  }
});

test('now realias', function (t) {
  spies.getDeployments = sinon.spy(function () {
    return [{
      uid: 2,
      name: 'aliased deploy'
    }, {
      uid: 1,
      name: 'idle deploy'
    }];
  });

  spies.getAliases = sinon.spy(function () {
    return [{
      uid: 8,
      deploymentId: 2
    }];
  });

  return main().then(function (res) {
    t.deepEqual(res, [{ uid: 1, name: 'idle deploy' }]);
  });
});