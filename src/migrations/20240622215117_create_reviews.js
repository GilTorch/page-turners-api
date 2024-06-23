/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.createTable('reviews', table => {
        
        table.uuid('id').primary();
        table.uuid('book_id').notNullable();
        table.uuid('user_id').notNullable();
        table.enu('rating', [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]);
        table.text('review');
        // Foreign keys
        table.foreign('user_id').references('id').inTable('users');
        table.foreign('book_id').references('id').inTable('books');
        // timestamps
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
    return knex.schema.dropTableIfExists('reviews')

};
