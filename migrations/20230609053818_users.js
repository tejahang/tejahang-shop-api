/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary(); // id
    table.string('email').notNullable(); // varchar 255
    table.string('password').notNullable(); // varchar 255
    table.string('firstname').notNullable(); // varchar 255
    table.string('lastname').notNullable(); // varchar 255
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
