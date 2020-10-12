const { Model, DataTypes } = require('sequelize');

class PostImage extends Model {
    static init(sequelize) {
        super.init({
            image_url: {
                type: DataTypes.STRING,
                allowNull: {
                    args: true
                },
            },
            image_key: {
                type: DataTypes.STRING,
                allowNull: {
                    args: true
                },
            },
        }, {
            sequelize,
            modelName: 'PostImage',
            tableName:'post_images',
            freezeTableName: true
        })
    }
    static associate(models) {
        this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'imgs' });
    }
};
module.exports = PostImage;
