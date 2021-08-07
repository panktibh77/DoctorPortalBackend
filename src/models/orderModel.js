const Model = require("./model").default;

module.exports = class Order extends Model {
    static get tableName() {
        return "order";
    }

    static get idColumn() {
        return "id";
    }

}
