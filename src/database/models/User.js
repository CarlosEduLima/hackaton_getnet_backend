const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'O nome do usuário não pode ser nulo'
                },
                validate: {
                    notEmpty: {
                        msg: "O nome do usuário não pode está vazio"
                    },
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'O e-mail não pode ser nulo'
                },
                unique: {
                    args: true,
                    msg: 'O e-mail fornecido já está em uso.'
                },
                validate: {
                    isEmail: {
                        msg: 'O e-mail fornecido não é válido'
                    },
                    len: {
                        args: [4, 30],
                        msg: 'O e-mail deve ter entre 4 e 30 caracteres'
                    },
                    notEmpty: {
                        msg: 'O e-mail não pode ser vazio'
                    },
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'O senha não pode ser nula'
                },
                validate: {
                    notContains: {
                        args: ' ',
                        msg: 'A senha não pode conter espaços em brancos'
                    },
                    notEmpty: {
                        msg: 'A senha não pode ser vazia'
                    }
                }
            },
            email_verification: {
                type: DataTypes.STRING,
                allowNull: true
            },
            password_reset_token: {
                type: DataTypes.STRING,
                allowNull: true
            },
            password_reset_expires: {
                type: DataTypes.STRING,
                allowNull: true
            },
            latitude: {
                type: DataTypes.STRING,
                allowNull: true
            },
            longitude: {
                type: DataTypes.STRING,
                allowNull: true
            },
            has_shop: {
                type: DataTypes.BOOLEAN,
                allowNull: {
                    args: false,
                    msg: 'hasShop não pode ser nulo'
                },
            },
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            freezeTableName: true
        })
    }
    static associate(models) {
        this.hasMany(models.Shop, { foreignKey: 'user_id', as: 'user_shops' });
        this.hasMany(models.Rate, { foreignKey: 'user_id', as: 'gived_rates' });
        this.hasMany(models.Like, { foreignKey: 'user_id', as: 'gived_likes' });
        this.hasMany(models.Cart, { foreignKey: 'user_id', as: 'user_cart' });
    }

};
module.exports = User;