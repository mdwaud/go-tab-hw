var assert = require('assert');
const fs = require('fs')
var models = require('../models.js')

const sales_fixture = 'sales.sql'
const Database = require('better-sqlite3');


describe('models', function() {
  var db;

  before(function(){
    db = new Database(':memory:');
  })

  after(function() {
    db.close();
  })

  describe('#question_1()', function() {
    before(function() {
      let data = fs.readFileSync(sales_fixture, 'utf-8')
      db.exec(data)
    })

    it('run the query', function() {
      results = models.question_1(db)

      // we should have 4 rows
      assert.equal(results.length, 4);

      // check the actual results
      assert.equal(results[0]["AGENT_NAME"], "Frank Jones");
      assert.equal(results[0]["DEPARTMENT_NAME"], "North America");
      assert.equal(results[0]["TOTAL_SALES"], 2500);

      assert.equal(results[1]["AGENT_NAME"], "Sally Smith");
      assert.equal(results[1]["DEPARTMENT_NAME"], "North America");
      assert.equal(results[1]["TOTAL_SALES"], 2200);

      // etc...
    });
  });
});