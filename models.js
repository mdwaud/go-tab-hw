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
  }
}