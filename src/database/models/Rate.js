const { Model, DataTypes } = require('sequelize');

class Rate extends Model {
    static init(sequelize) {
        super.init({
            rate: {
                type:DataTypes.FLOAT,
                allowNull:{
                    args: false,
                    msg:'A nota não pode ser nula'
                }
            }
            
        }, {
            sequelize,
            modelName: 'Rate',
            tableName: 'rates',
            freezeTableName: true
        })
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'users_rates' });
        this.belongsTo(models.Shop, { foreignKey: 'shop_id', as: 'rates' });
    }
};
module.exports = Rate;