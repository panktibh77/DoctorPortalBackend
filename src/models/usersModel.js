const Model = require('./model').default;

export default class Users extends Model {
    static get tableName() {
        return 'users';
    }
    static get idColumn() {
        return 'id';
    }

}