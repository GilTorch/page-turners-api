/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.createTable('orders', (table) => {

        table.uuid('id').defaultTo(knex.fn.uuid()).primary();
        table.uuid('user_id');
        table.uuid('book_id');
        table.integer('quantity');
        table.enu('status', ['ACTIVE', 'DELETED']);
        // timestamps
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
    return knex.schema.dropTableIfExists('orders');
};
