
const { Model } = require('objection');


class Users extends Model {
    static get tableName() {
      return 'users';
    }
  
    static get relationMappings() {

        const Books = require('./Books');
        const Reviews = require('./Reviews');
        const Orders = require('./Orders');
        
        return {
            // books
            books: {
                relation: Model.HasManyRelation,
                modelClass: Books,
                join: {
                    from: 'users.id',
                    to: 'books.author_id'
                }
            },
            reviews: {
                relation: Model.HasManyRelation,
                modelClass: Reviews, 
                join: {
                    from: 'users.id',
                    to: 'reviews.user_id'
                }
            },
            reviewedBooks: {
                relation: Model.ManyToManyRelation,
                modelClass: Reviews,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'reviews.user_id',
                        to: 'reviews.book_id'
                    },
                    to: 'books.id'
                }
            },
            orders: {
                relation: Model.HasManyRelation,
                modelClass: Orders,
                join: {
                    from: 'users.id',
                    to: 'orders.user_id'
                }
            }, 
            orderedBooks: {
                relation: Model.ManyToManyRelation,
                modelClass: Orders,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'orders.user_id',
                        to: 'orders.book_id'
                    },
                    to: 'books.id'
                }
            },
        }
    }
}

export default Users;
  