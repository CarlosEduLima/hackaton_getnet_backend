const { Model, DataTypes } = require('sequelize');

class Post extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'O nome do post não pode ser nulo'
                },
                validate: {
                    len: {
                        args: [4, 50],
                        msg: 'O nome do post deve ter entre 4 e 50 caracteres'
                    },
                    notEmpty: {
                        msg: "O nome do post não pode está vazio"
                    },
                }
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: true
            },
            price: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'O preço não pode ser nulo'
                },
                validate: {
                    notEmpty: {
                        msg: "O preço não pode está vazio"
                    },
                }
            },
            price_validity: {
                type: DataTypes.STRING,
                allowNull: true
            },
            timetable: {
                type: DataTypes.STRING,
                allowNull: true
            },
            type: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'O tipo do post não pode ser nulo'
                }
            },
            description: {
                type: DataTypes.STRING,
                validate: {
                    len: {
                        args: [0, 250],
                        msg: 'A descrição deve ter entre 0 e 250 caracteres'
                    },
                }
            },
            shop_city: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, {
            sequelize,
            modelName: 'Post',
            tableName: 'posts',
            freezeTableName: true
        })                                        
    }
    static associate(models) {
        this.belongsTo(models.Shop, { foreignKey: 'shop_id', as: 'shop_name' });
        this.belongsTo(models.PostCategory, { foreignKey: 'category_id', as: 'post_category' })
        this.belongsToMany(models.Cart, { foreignKey: 'post_id', through: 'cart', as: 'saved_post' });
        this.hasMany(models.Like, { foreignKey: 'post_id', as: 'post_likes' });
        this.hasMany(models.PostImage, { foreignKey: 'post_id', as: 'imgs' });
    }
};
module.exports = Post;