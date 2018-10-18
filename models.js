module.exports = {
  db_test: function(db, value) {
    let sql = `SELECT ? as 'result';`;
    const stmt = db.prepare(sql);
    const result = stmt.get(value);

    return result['result']
  }
}