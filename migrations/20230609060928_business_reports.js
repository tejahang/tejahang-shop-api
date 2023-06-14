/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('business_reports', (table) => {
    table.increments('id').primary(); // id
    table.integer('user_id').notNullable().unsigned();
    table.foreign('user_id').references('users.id');
    table.integer('product_id').notNullable().unsigned();
    table.foreign('product_id').references('products.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('business_reports');
};
