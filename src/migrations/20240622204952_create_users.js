/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('users', function (table) {
    
        table.uuid('id').defaultTo(knex.fn.uuid()).primary();
        table.string('username').unique().notNullable(); //unique
        table.string('email').unique().notNullable(); // unique
        table.string('last_name').notNullable();
        table.string('first_name').notNullable();
        table.string('password').notNullable();
        table.enu('gender', ['MALE', 'FEMALE']);
        table.date('birthday').notNullable();
        table.jsonb('address').notNullable();
        table.string('otp');
        table.timestamp('otp_expires_at');
        table.enu('status', ['ACTIVE','EMAIL_NOT_VERIFIED', 'DELETED']).defaultTo('EMAIL_NOT_VERIFIED');
        // address_line1: Street address, including house number and street name.
        // address_line2: Additional address information (e.g., apartment number, suite number).
        // city: The city name.
        // state: The state or province.
        // postal_code: The ZIP or postal code.
        // country: The country name or code.
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
