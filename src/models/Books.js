const { Model } = require('objection');
const Review = require('./Reviews');


class Books extends Model {

    static get tableName() {
        return 'books'
    }

    static get modifiers() {
        return {
            activeOnly(builder) {
                builder.where('status', ['ACTIVE', 'OUT_OF_STOCK']);
            }
        }
    }
  


    static async getAverageRating(bookId) {
        
        const result = await Review.query()
          .where('book_id', bookId)
          .avg('rating as averageRating')
          .first();
    
        return result ? parseFloat(result.averageRating).toFixed(2) : null;
    }

    static getRelationMappings() {

        const Users = require('./Users');
        
        return {
            author: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'books.author_id',
                    to: 'users.id'
                }
            },
            reviews: {
                relation: Model.HasManyRelation,
                modelClass: Reviews,
                join: {
                    from: 'books.id',
                    to: 'reviews.book_id'
                }
            },
            reviewAuthors: {
                relation: Model.ManyToManyRelation,
                modelClass: Reviews,
                from: 'books.id',
                through: {
                    from: 'reviews.book_id',
                    to: 'reviews.user_id'
                },
                to: 'users.id'
            }
        }
    }
}

module.exports = Books;