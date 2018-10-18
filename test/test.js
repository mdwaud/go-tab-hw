var assert = require('assert');
var models = require('../models.js')

describe('models', function() {
  describe('#add()', function() {
    it('should add numbers', function() {
      actual = models.add(1,2)
      assert.equal(actual, 3);
    });
  });
});
