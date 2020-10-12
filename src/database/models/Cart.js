const { Model, DataTypes } = require('sequelize');

class Cart extends Model {
    //metodo recebe conexão com bd
    static init(sequelize) {
        super.init({},
        {
            sequelize,
            modelName: 'Cart',
            tableName:'cart',
            freezeTableName: true
        })
    }
    static associate(models) {
        this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'saved_post' });
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'consumer_card' });
    }
};
module.exports = Cart;

