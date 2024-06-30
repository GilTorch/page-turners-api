const { Model } = require('objection');

class Reviews extends Model {

    static getTableName(){
        return 'reviews'
    }

    static get modifiers() {
        return {
            activeOnly(builder) {
                builder.where('status', 'ACTIVE');
            }
        }
    }
  

    static relationMappings(){

        const Users = require('./Users');
        const Books = require('./Books');

        return {
            author: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: "reviews.user_id",
                    to: "users.id"
                }
            },
            book: {
                relation: Model.BelongsToOneRelation,
                modelClass: Books,
                join: {
                    from: "reviews.book_id",
                    to: "books.id"
                }
            },
        }

    }

}

export default Reviews;