const { Model, DataTypes } = require('sequelize');

class ShopCategory extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'O nome da categoria não pode ser nulo'
                }
            },
        }, {
            sequelize,
            modelName: 'ShopCategory',
            tableName: 'shop_categories',
            freezeTableName: true
        })
    }
    static associate(models) {
        this.hasMany(models.Shop, { foreignKey: 'category_id', as: 'shop_category' });
    }

};
module.exports = ShopCategory;