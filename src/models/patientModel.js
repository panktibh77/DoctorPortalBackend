const Model = require('./model').default;

export default class Patients extends Model {
    static get tableName() {
        return 'patients';
    }
    static get idColumn() {
        return 'id';
    }

}