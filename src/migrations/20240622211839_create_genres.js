/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('genres', table => {

        table.uuid('id').defaultTo(knex.fn.uuid()).primary();
        table.string('title');
        table.string('cover');
        table.string('status', ['ACTIVE', 'DELETED'])

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('genres');
};
