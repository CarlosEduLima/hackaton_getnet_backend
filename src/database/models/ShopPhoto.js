const { Model, DataTypes } = require('sequelize');

class ShopPhoto extends Model {
    static init(sequelize) {
        super.init({
            image_url: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'A url da imagem não pode ser nula'
                },
            },
            image_key: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'A key da imagem não pode ser nula'
                },
            },
            legend: DataTypes.STRING,
        }, {
            sequelize,
            modelName: 'ShopPhoto',
            tableName:'shop_photos',
            freezeTableName: true
        })
    }
    static associate(models) {
        this.belongsTo(models.Shop, { foreignKey: 'shop_id', as: 'shop' });
    }
};
module.exports = ShopPhoto;