const { Model, DataTypes } = require('sequelize');

class PostCategory extends Model {
    static init(sequelize) {
        super.init({
            category_name: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'O nome da categoria não pode ser nulo'
                }
            },
        }, {
            sequelize,
            modelName: 'PostCategory',
            tableName: 'post_categories',
            freezeTableName: true
        })
    }
    static associate(models) {
        this.hasMany(models.Shop, { foreignKey: 'category_id', as: 'shop_category' });
    }

};
module.exports = PostCategory;