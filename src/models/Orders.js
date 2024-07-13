const { Model } = require('objection');

class Orders extends Model {

    static tableName(){
        return 'orders'
    }

    static get modifiers() {
        return {
            activeOnly(builder) {
                builder.where('status', 'ACTIVE');
            }
        }
    }
  

    static relationMappings(){

        const Books = require('./Books');
        const Users = require('./Users');

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'orders.user_id',
                    to: 'users.id'
                }
            },
            book: {
                relation: Model.BelongsToOneRelation,
                modelClass: Books,
                join: {
                    from: 'orders.book_id',
                    to: 'books.id'
                }
            }
        }
    }

}

module.exports = Orders;