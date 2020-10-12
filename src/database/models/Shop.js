const { Model, DataTypes } = require('sequelize');

class Shop extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'O nome do estabelecimento não pode ser nulo'
                },
            },
            owner_name: {
                type: DataTypes.STRING,
                allowNull: true,

            },
            cnpj: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'O CNPJ do estabelecimento não pode ser nulo'
                },
                unique: {
                    args: true,
                    msg: 'O CNPJ fornecido já está em uso.'
                },
            },
            open_time: {
                type: DataTypes.STRING,
                allowNull: true
            },
            close_time: {
                type: DataTypes.STRING,
                allowNull: true
            },
            open_day: {
                type: DataTypes.STRING,
                allowNull: true
            },
            close_day: {
                type: DataTypes.STRING,
                allowNull: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            thumbnail_url: {
                type: DataTypes.STRING,
                allowNull: true
            },
            thumbnail_key: {
                type: DataTypes.STRING,
                allowNull: true
            },
            verified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            state: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'O nome do estado não pode ser nulo'
                },
            },
            city: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'O nome da cidade não pode ser nulo'
                },
            },
            district: {
                type: DataTypes.STRING,
            },
            latitude: {
                type: DataTypes.STRING,
                allowNull: true
            },
            longitude: {
                type: DataTypes.STRING,
                allowNull: true
            },
            address: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'O endereço não pode ser nulo'
                },
            },
            cep: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'O CEP não pode ser nulo'
                },
            },
        }, {
            sequelize,
            modelName: 'Shop',
            tableName: 'shops',
            freezeTableName: true
        })
    }
    static associate(models) {
        this.hasMany(models.Rate, { foreignKey: 'shop_id', as: 'rates' });
        this.belongsTo(models.ShopCategory, { foreignKey: 'category_id', as: 'shop_category' });
        this.hasMany(models.ShopPhoto, { foreignKey: 'shop_id', as: 'photos' });
        this.hasMany(models.ShopContact, { foreignKey: 'shop_id', as: 'shop_contact' });
        this.hasMany(models.Post, { foreignKey: 'shop_id', as: 'shop_name' });

    }
};
module.exports = Shop;