const Model = require("./model").default;

export default class Product extends Model {
    static get tableName() {
        return "product";
    }

    static get idColumn() {
        return "id";
    }

    // static get idColumn(){
    //     return 'id';
    // }
}
