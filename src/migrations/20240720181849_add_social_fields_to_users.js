/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.alterTable('users', (table) => {
        table.boolean("socialAccount").defaultTo(false)
        table.string("facebookAccountId")
        table.string("googleAccountId")
        table.string("twitterAccountId")
        table.string("githubAccountId")
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.alterTable("users", (table) => {
        table.dropColumn("socialAccount")
        table.dropColumn("facebookAccountId")
        table.dropColumn("googleAccountId")
        table.dropColumn("twitterAccountId")
        table.dropColumn("githubAccountId")
    })
  
};
