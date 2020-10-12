'use strict';
const path = require('path');
const Sequelize = require('sequelize');
const config = require(path.resolve(__dirname, 'config', 'index.js'));
const Shop = require('./models/Shop');
const User = require('./models/User');
const ShopPhoto = require('./models/ShopPhoto');
const PostImage = require('./models/PostImage');
const Rate = require('./models/Rate');
const Cart = require('./models/Cart');
const Like = require('./models/Like');
const Post = require('./models/Post');
const ShopContact = require('./models/ShopContact');
const PostCategory = require('./models/PostCategory');
const ShopCategory = require('./models/ShopCategory');
const connection = new Sequelize(config.database, config.username, config.password, config);

User.init(connection);
ShopCategory.init(connection);
PostCategory.init(connection);
Shop.init(connection);
ShopPhoto.init(connection);
ShopContact.init(connection);
Post.init(connection);
PostImage.init(connection);
Rate.init(connection);
Cart.init(connection);
Like.init(connection);



Shop.associate(connection.models);
User.associate(connection.models);
PostCategory.associate(connection.models);
ShopCategory.associate(connection.models);
ShopPhoto.associate(connection.models);
Post.associate(connection.models);
Rate.associate(connection.models);
Cart.associate(connection.models);
Like.associate(connection.models);
PostImage.associate(connection.models);

module.exports = connection;