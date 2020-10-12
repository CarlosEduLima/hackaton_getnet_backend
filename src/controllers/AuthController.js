const User = require('../database/models/User');
const encrypter = require('../objects/encrypter');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {
    async authenticate(req, res, next) {
        try {
            const { user_email, user_password } = req.body;
            const user = await User.findOne({ where: { email: user_email } });

            if (!user)
                return res.status(404).send({ success: false, message: 'Usuário inexistente' });

            if (!await encrypter.compareHash(user_password, user.password))
                return res.status(400).send({ success: false, message: 'Senha incorreta' })

            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: 86400
            });

            const { password, ...userDatas } = user.dataValues;
            res.json({ success: true, token, user: userDatas })
        } catch (e) {
            return next(e)
        }

    },
    async checkToken(req, res) {
        try {
            const { authorization } = req.headers;
            if (!authorization)
                return res.status(401).send({ success: false, message: 'Nenhum token fornecido' })

            const parts = authorization.split(' ');

            if (!parts.length == 2)
                return res.status(401).send({ success: false, message: 'Token inválido' });

            const [schema, token] = parts;

            if (!/^Bearer$/i.test(schema))
                return res.status(401).send({ success: false, message: 'Token inválido' });

            jwt.verify(token, authConfig.secret, async (error, decoded) => {
                if (error) return res.status(401).send({ success: false, message: 'Token inválido' });
                const { id } = decoded;

                const user = await User.findOne({ where: { id } });
                if (!user) return res.status(404).send({ success: false, message: 'Usuário inexistente' });

                const { password_hash, ...userDatas } = user.dataValues;

                return res.json({ success: true, message: 'Token válido', user: userDatas });
            });
        } catch (e) {
            return next(e)
        }
    }
}