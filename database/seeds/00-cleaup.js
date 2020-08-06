const cleaner = require('knex-cleaner');

function cleanTables(knex) {
  return cleaner
    .clean(knex, {
      mode: 'truncate',
      restartIdentity: true,
      ignoreTables: ['knex_migrations', 'knex-migrations_lock'],
    })
    .then(() => console.log("Tables have been truncated, let's seed!"))
}
exports.seed = function(knex) {
  if (knex.client.config.client === 'sqlite3') {
    return knex.raw("PRAGMA foreign_keys = OFF;").then(() => cleanTables(knex));
  } else {
    return cleanTables(knex);
  }

};
