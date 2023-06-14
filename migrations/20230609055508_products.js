/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary(); // id
    table.string('title').notNullable(); // varchar 255
    table.decimal('price', 8, 2).notNullable();
    table.string('brand').notNullable(); // varchar 255
    table.text('description');
    table.integer('count').defaultTo(10);
    table.boolean('sale').defaultTo(false);
    table.string('image').notNullable();
    table.string('category').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('products');
};
