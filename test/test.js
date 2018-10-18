var assert = require('assert');
var models = require('../models.js')

const Database = require('better-sqlite3');


describe('models', function() {
  var db;

  before(function(){
    db = new Database(':memory:');
  })

  after(function() {
    db.close();
  })

  describe('#db_test()', function() {
    it('should add numbers', function() {
      actual = models.db_test(db, 5)
      assert.equal(actual, 5);
    });
  });
});