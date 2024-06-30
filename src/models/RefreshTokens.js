const { Model } = require('objection');


class RefreshTokens extends Model {

    static tableName(){
        return 'refresh_tokens'
    }

}

export {
    RefreshTokens
}