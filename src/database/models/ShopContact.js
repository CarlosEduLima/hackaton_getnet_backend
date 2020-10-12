const { Model, DataTypes } = require('sequelize');

class ShopContact extends Model {
    static init(sequelize) {
        super.init({
            contact_name: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'O nome do contato não pode ser nulo'
                },
                notEmpty: {
                    msg: "O nome pode está vazio"
                },
            },
            value: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'o contato pode ser nulo'
                },
                notEmpty: {
                    msg: "O contato não pode está vazio"
                },
            },
        }, {
            sequelize,
            modelName: 'ShopContact',
            tableName:'shop_contacts',
            freezeTableName: true
        })
    }
    static associate(models) {
        this.belongsTo(models.Shop, { foreignKey: 'shop_id', as: 'shop_contact' });
    }
};
module.exports = ShopContact;