const { Model, DataTypes } = require('sequelize');

class Like extends Model {
    static init(sequelize) {
        super.init( {},
            {
            sequelize,
            modelName: 'Like',
            tableName:'likes',
            freezeTableName: true
        })
    }
    static associate(models) {
        this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post_likes' });
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'consumer_likes' });
    }
};
module.exports = Like;
