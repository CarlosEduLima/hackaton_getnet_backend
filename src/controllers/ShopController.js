const { Op } = require("sequelize");
const Shop = require('../database/models/Shop');
const ShopContact = require('../database/models/ShopContact');
const User = require('../database/models/User');
const { paginate } = require("../objects/paginator");
const CnpjPromise = require('cnpj-promise').default;
const encrypter = require('../objects/encrypter');
const aws = require("aws-sdk");
const Post = require('../database/models/Post');
const PostImage = require('../database/models/PostImage');
const ShopCategory = require('../database/models/ShopCategory');
const Like = require('../database/models/Like');

const s3 = new aws.S3();

module.exports = {
    async index(req, res, next) {
        try {
            const shops = await Shop.findAll()

            return res.json(shops);
        } catch (e) {
            return next(e)
        }
    },

    async show(req, res) {
        const { shop_id } = req.params;

        if (!shop_id)
            return res.status(400).send({ success: false, error: 'Id da loja não enviado' });

        const shop = await Shop.findOne({
            where: { id: shop_id },
            include: [{ association: 'shop_category' }, { association: 'shop_contact' }]
        })
        if (!shop)
            return res.status(404).send({ sucess: false, message: 'Estabelecimento não foi encontrado' });

        return res.status(200).json({ sucess: true, shop })

    },

    async search_shop(req, res, next) {
        try {
            const {shop_name} = req.body
            
            if (!shop_name)
                return res.status(400).send({ success: false, error: 'Nome do shop não enviado' });

            const shops = await Shop.findAll({
                attributes: ['id', 'name', 'city'],
                where: {
                    name: {
                        [Op.iLike]: `${shop_name}%`
                    }
                },
                limit: 15
            })
            return res.status(200).json({ success: true, shops });
        } catch (e) {
            return next(e)
        }
    },

    async store(req, res, next) {
        try {
            const { user_id } = req.params
            const {
                name,
                owner_name,
                cnpj,
                category_id,
                open_time,
                close_time,
                open_day,
                close_day,
                description,
                state,
                city,
                district,
                latitude,
                longitude,
                address,
                cep
            } = req.body;

            if (!user_id)
                res.status(400).send({ success: false, error: 'Id do usuário não enviado' });

            if (!await User.findOne({ where: { id: user_id } }))
                return res.status(400).send({ error: 'Usuário não encontrado' });

            if (await Shop.findOne({ where: { cnpj: cnpj } }))
                return res.status(400).send({ error: 'O CNPJ já está em uso' });

            if (!await CnpjPromise(cnpj))
                return res.status(400).json({ success: false, message: 'Erro na consulta de cnpj' });

            const shop = await Shop.create({
                user_id,
                category_id,
                name,
                owner_name,
                open_time,
                close_time,
                open_day,
                close_day,
                description,
                cnpj,
                state,
                city,
                district,
                latitude,
                longitude,
                address,
                cep
            })

            if (shop.id) {
                const user = await User.findOne({ where: { id: user_id } })
                await user.update({ has_shop: true })
                return res.status(200).json({ success: true, message: 'Estabelecimento cadastrado com sucesso', shop });
            }
        } catch (e) {
            return next(e)
        }
    },
    async update(req, res, next) {
        const { shop_id, user_id } = req.params;
        const { name, owner_name, cnpj, category_id, open_time, close_time, open_day, close_day, description, state, city, district, latitude, longitude, address, cep } = req.body;
        console.log(shop_id)
        if (!shop_id)
            return res.status(400).send({ success: false, message: 'id do estabelecimento não fornecido' });

        const shop = await Shop.findOne({ where: { id: shop_id } });

        if (!shop) return res.status(404).send({ success: false, message: 'Estabelecimento não encontrado' });

        if (shop.user_id != user_id)
            return res.status(400).send({ success: false, message: 'Este estabelecemento não pertence a esse usuário' });

        return await shop.update({
            name,
            owner_name,
            cnpj,
            category_id,
            open_time,
            close_time,
            open_day,
            close_day,
            description,
            state,
            city,
            district,
            latitude,
            longitude,
            address,
            cep
        }).then(() =>
            res.json({
                success: true,
                message: "Dados atualizados com sucesso",
                shop
            })
        )
            .catch((error) => {
                if (!Array.isArray(error.errors)) {
                    return res.status(405).send({
                        success: false,
                        message: "Ocorreu um erro ao atualizar os dados do estabelecimento",
                    });
                } else {
                    const message = error.errors[0].message;
                    return res.status(405).send({ success: false, message });
                }
            });

    },
    async delete(req, res, next) {
        try {
            const { shop_id, user_id } = req.params;

            if (!shop_id || !user_id) return res.status(406).send({ success: false, message: 'ID não fornecido' });

            const shop = await Shop.findOne({ where: { id: shop_id } });

            if (!shop) return res.status(404).send({ success: false, message: 'Estabelecimento não foi encontrado' });

            if (!await Shop.findOne({ where: { user_id: user_id } }))
                return res.status(400).send({ success: false, message: 'Este estabelecimento não pertence a esse usuário' });

            if (shop.thumbnail_key) {
                const params = {
                    Bucket: 'pricebuddy/shopProfileImgs',
                    Key: shop.thumbnail_key
                };

                await s3.deleteObject(params, function (err, data) {
                    if (err) console.log(err, err.stack);
                    else console.log(data);
                });
            }

            await shop.destroy();

            return res.status(200).json({ success: true, message: 'estabelecimento deletado' });
        } catch (e) {
            return next(e)
        }

    },
    async shop_posts(req, res) {
        const { shop_id } = req.params;

        if (!shop_id)
            return res.status(400).send({ success: false, error: 'Id da loja não enviado' });

        const shop_posts = await Post.findAll({
            where: { shop_id: shop_id },
            include: [{ association: 'post_likes' }, { association: 'imgs' }],
            order: [
                ['created_at', 'DESC'],
            ]
        })

        return res.json(shop_posts);
    },

};