const { spawnSync } = require( 'child_process' )

module.exports = {
  question_1: function(db) {
    let sql = `
    SELECT AGENT_NAME, DEPARTMENT_NAME, SUM(AMOUNT) AS \`TOTAL_SALES\`
    FROM SALES_RECORDS
    LEFT JOIN SALES_AGENTS USING(AGENT_ID)
    LEFT JOIN DEPARTMENTS USING(DEPARTMENT_ID)
    GROUP BY AGENT_ID
    ORDER BY TOTAL_SALES DESC
    ;
    `;

    const stmt = db.prepare(sql);
    const result = stmt.all();

    return result
  },

  // question 2:
  // Not sure I completely understand this one, but you could just add a
  // table off of salesrecords that has the commission paid. Depends on
  // how normalized you want your schema to be.

  question_3: function(sales_data) {
    total_sales = sales_data["Results"].reduce(function(acc, row) {
      return row["Sales"] + acc
    }, 0)

    return {
      average_sales: total_sales / sales_data["Results"].length,
      employees_exceeding: function(amount) {
        return sales_data["Results"]
          .filter(function(employee) {
            // we explictly want "exceeding", so it's > and not >=
            return employee["Sales"] > amount
          }).map(function(employee) {
            return employee["Name"]
          })
      }
    }
  },

  question_4:
`<style>
  #container > #block1 > #num1.red {
    color: red
  }
  </style>`,

  question_5: "https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html",
  /*
  The HTTP spec does a much better job than I could do:
  https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html
  But that's just a spec. Sometimes people do weird stuff with their
  implementations and you just have to deal with it.

  To summarize a few differences between GET and POST
  HTTP GET is supposed to be idempotent - you access a resource without any
  changes to the system (besides some logging). Typically it's used for "read"
  operations in both frontends and APIs.

  HTTP POST is meant to more explicitly transfer data to a server and may cause
  side effects. Typically it's used for "insert" type operations such as form
  submissions. It also handles parameters differently than GET and supports
  the wonder that is 'multipart/form-data'
  */

  question_6: function(filename) {
    // const cmd = `sort ${filename} | uniq -c | awk '{ if ($1 != 1) { print } }'`
    const cmd = `sort ${filename}`
    const output = spawnSync( './count_dupes.sh', [filename] );

    return output.stdout.toString()
  }
}