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

  describe('#question_3', function() {
    let sales_data = {
      "Results": [
        {
          "Name": "Frank Jones",
          "Department": "North America",
          "Sales": 2500
        }, {
          "Name": "Sally Smith",
          "Department": "North America",
          "Sales": 2200
        }, {
          "Name": "Ed Kramer",
          "Department": "Europe",
          "Sales": 1700
        }, {
          "Name": "Susan Johnson",
          "Department": "Asia",
          "Sales": 2000
        }
      ]
    }

    it('computes the average', function() {
      obj = models.question_3(sales_data)

      assert.equal(obj.average_sales, 2100)
    });

    it('calculates employees exceeding 2000', function() {
      obj = models.question_3(sales_data)
      employees = obj.employees_exceeding(2000)

      // something like assert.same_elements() would be useful
      assert.equal(employees.length, 2)
      assert(employees.includes("Frank Jones"))
      assert(employees.includes("Sally Smith"))
    });
  });

  describe('#question_6', function() {
    it('selects the repeating words and their counts', function() {
      const result = models.question_6(`${__dirname}/words.txt`)

      assert(result.includes("3 bob"))
      assert(result.includes("2 charlie"))
    })
  })
});