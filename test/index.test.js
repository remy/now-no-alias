const tap = require('tap');
const test = tap.test;
const sinon = require('sinon');
const spies = {
  getAliases: null,
  getDeployments: null,
};

const proxyquire = require('proxyquire');
const main = proxyquire('../', {
  'now-client': () => {
    return {
      getDeployments() {
        return Promise.resolve(spies.getDeployments());
      },
      getAliases() {
        return Promise.resolve(spies.getAliases());
      },
    };
  }
});

test('now realias', t => {
  spies.getDeployments = sinon.spy(() => [{
    uid: 2,
    name: 'aliased deploy'
  }, {
    uid: 1,
    name: 'idle deploy'
  }]);

  spies.getAliases = sinon.spy(() => [{
    uid: 8,
    deploymentId: 2
  }]);

  return main().then(res => {
    t.deepEqual(res, [{ uid: 1, name: 'idle deploy' }]);
  });
});
