const Sequelize = require('sequelize');
const Post = require('../database/models/Post');
const { getPagination, getPagingData } = require("../objects/paginator");
const PostCategory = require('../database/models/PostCategory');
const Shop = require('../database/models/Shop');
const PostImage = require('../database/models/PostImage');
const Like = require('../database/models/Like');
const aws = require("aws-sdk");
const s3 = new aws.S3();
module.exports = {

    async index(req, res, next) {
        try {
            //const { page, size } = req.query;
            //const { limit, offset } = getPagination(page, size);
            const posts = await Post.findAll({
                include: [{ association: 'post_likes' }, { association: 'imgs' }, { association: 'shop_name', attributes: ['name'] }],
                order: [
                    ['created_at', 'DESC'],
                ],
            })
            return res.status(200).json({ sucess: true, posts })
        } catch (e) {
            return next(e)
        }

    },
    async show(req, res, next) {
        try {
            const { post_id } = req.params
            const post = await Post.findOne({
                where: { id: post_id },
                include: [{ association: 'post_likes' }, { association: 'imgs' }, { association: 'shop_name', attributes: ['name'] }]
            })

            const shop = await Shop.findOne({ where: { id: post.shop_id } })
            const user = shop.user_id

            return res.status(200).json({ sucess: true, post, user })
        } catch (e) {
            return next(e)
        }

    },
    async search(req, res) {
        const { post_name } = req.body
        if (!post_name)
            return res.status(400).send({ success: false, error: 'Nome do post não enviado' });

        const posts = await Post.findAll({ where: { name: post_name } })

        return res.json(posts);
    },
    async store(req, res, next) {
        try {
            const { key, location: url = "" } = req.file;
            const { shop_id } = req.params;
            const { name, type, price, description, timetable, brand, price_validity, category_id } = req.body;

            if (!await PostCategory.findOne({ where: { id: category_id } }))
                return res.status(400).send({ success: false, message: 'Categoria inexistente' });

            const shop = await Shop.findOne({ where: { id: shop_id } });
            if (!shop)
                return res.status(400).send({ success: false, message: 'Estabelecimento inexistente' });

            const post = await Post.create({
                shop_id,
                category_id,
                name,
                brand,
                price,
                price_validity,
                timetable,
                type,
                description,
                shop_city: shop.city
            })

            if (post.id) {
                await PostImage.create({
                    post_id: post.id,
                    image_key: key,
                    image_url: url
                })
            }

            return res.status(200).json({ success: true, message: 'Post cadastrado com sucesso', post });

        } catch (e) {
            return next(e)
        }
    },
    async delete(req, res, next) {
        try {
            const { post_id } = req.params
            const post = await Post.findOne({ where: { id: post_id } })
            const postImg = await PostImage.findOne({ where: { post_id } })

            const params = {
                Bucket: 'pricebuddy/shopProfileImgs',
                Key: postImg.image_key
            };

            await s3.deleteObject(params, function (err, data) {
                if (err) console.log(err, err.stack);
                else console.log(data);
            });

            await postImg.destroy()
            await post.destroy()
            return res.status(200).json({ sucess: true, msg: 'post deleted' })
        } catch (e) {
            return next(e)
        }
    }
};