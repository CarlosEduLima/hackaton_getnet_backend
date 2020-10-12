const User = require('../database/models/User');
const Shop = require('../database/models/Shop');
const sendEmail = require('../objects/sendEmail');
const transporter = require('../config/mailer');
const encrypter = require('../objects/encrypter');
const { template } = require('../resources/forgotPass')
module.exports = {

    async index(req, res, next) {
        try {
            const { user_id } = req.params;
            if (!user_id)
                return res.status(404).send({ success: false, message: "Id do usuário não fornecido" });
            const user = await User.findOne({
                where: { id: user_id }
            })
            if (!user) {
                return res.status(400).send({ success: false, message: "Usuário não encontrado" });
            } else {
                return res.status(200).send({ success: true, user });
            }
        } catch (erro) {
            return next(erro)
        }

    },

    async showAll(req, res, next) {
        await User.findAll()
            .then(users => res.status(200).send({ success: true, users }))
            .catch(error => res.status(400).send({ error: 'ocorreu um erro ao recuperar os usuários' }, error))
    },

    async getUserShops(req, res) {
        try {
            const { user_id } = req.params;
            const user = await User.findOne({ where: { id: user_id } })
            if (!user) {
                return res.status(400).send({ success: false, message: "Usuário não encontrado" });
            } else if (!user.has_shop) {
                return res.status(400).send({ success: false, message: "Este usuário não possui estabelecimentos" });
            } else {
                const shops = await Shop.findAll({
                    where: { user_id },
                    include: [{ association: 'shop_category' }, { association: 'shop_contact' }]
                })
                if (!shops)
                    return res.status(400).send({ success: false, message: "Nenhum shop encontrado" });

                return res.status(200).send({ success: true, shops })
            }
        } catch (e) {
            return next(e)
        }
    },
    async store(req, res, next) {
        try {
            const { name, email, password, latitude, longitude } = req.body;

            if (await User.findOne({ where: { email: email } }))
                return res.status(400).send({ error: 'Email já está cadastrado' });

            const passwordHash = encrypter.createHash(password);
            const user = await User.create({
                name,
                email,
                password: passwordHash,
                latitude,
                longitude
            })
            if (user.id) {
                return res.status(200).json({ success: true, msg: 'Usuário criado, mas email não enviado'});
                /*transporter.sendMail({
                    to: email,
                    from: 'precocamarada1@gmail.com',
                    subject: 'Confirmação de email',
                    html: template
                }, (err) => {
                    if (err)
                    
                return res.status(200).json({ success: true, msg: 'Usuário criado e email enviado' });*/
                }
            
        } catch (e) {
            return next(e)
        }
    },
    async updatePassword(req, res, next) {
        try {
            const { user_id } = req.params;
            const { new_password, password } = req.body;
            if (!user_id)
                return res.status(406).send({ success: false, message: 'ID do usuário não fornecido' });
            if (!new_password)
                return res.status(406).send({ success: false, message: 'Nova senha não fornecida' });
            if (!password)
                return res.status(406).send({ success: false, message: 'Antiga senha não fornecida' });

            const user = await User.findOne({ where: { id } });

            if (!user)
                return res.status(404).send({ success: false, message: 'Usuário inexistente' });

            if (!await bcrypt.compare(password, user.consumer_password)) {
                return res.status(400).send({ success: false, message: 'Antiga senha está incorreta' })
            } else {
                password = bcrypt.hashSync(new_password, salt);
            }

            await User.update(password)

            res.json({ success: true, message: 'Senha atualizada com sucesso' });
        } catch (e) {
            return next(e)
        }

    },
    async delete(req, res, next) {
        try {
            const { user_id } = req.params;
            const { user_password } = req.body;

            if (!user_id || !user_password) return res.status(406).send({ success: false, message: 'id ou password não fornecidos', user_id, user_password });

            const user = await User.findOne({ where: { id: user_id } });

            if (!user) return res.status(404).send({ success: false, message: 'Usuário não foi encontrado' });

            if (!await bcrypt.compare(user_password, user.password))
                return res.status(400).send({ success: false, message: 'A senha está incorreta' });

            await user.destroy();

            return res.json({ success: true, message: 'Usuário Deletado' });
        } catch (e) {
            return next(e)
        }

    },
};