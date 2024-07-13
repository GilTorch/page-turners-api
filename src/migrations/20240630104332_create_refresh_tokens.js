/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('refresh_tokens', table => {

        table.uuid('id').defaultTo(knex.fn.uuid()).primary();
        table.text('refresh_token');
        // no status for this one only hard delete
        table.timestamp('created_at').defaultTo(knex.fn.now());
        // no updated at column for this because it's not supposed to be updated
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
    return knex.schema.dropTableIfExists('refresh_tokens');

};
