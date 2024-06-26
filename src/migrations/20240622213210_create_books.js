/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    // title, author, genre, price, stock quantity, cover image, description
    return knex.schema.createTable('books', table => {

        table.uuid('id').defaultTo(knex.fn.uuid()).primary();
        table.uuid('author_id');
        table.uuid('genre_id').notNullable();
        table.decimal('price');
        table.integer('stock_quantity');
        table.string('cover');
        table.text('description'); 
        table.string('author');   
        table.enu('status',['ACTIVE','DELETED', 'OUT_OF_STOCK']);
        
        // Foreign keys
        table.foreign('author_id').references('id').inTable('users');
        table.foreign('genre_id').references('id').inTable('genres');

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
    return knex.schema.dropTableIfExists('books');
};
