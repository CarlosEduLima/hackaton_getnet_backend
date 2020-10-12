const authConfig = require('../config/auth.json');
const User  = require('../database/models/User');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization) return res.status(401).send({ success: false, message: 'Nenhum token fornecido' });

    const parts = authorization.split(' ');
    if(!parts.length === 2) return res.status(401).send({ success: false, message: 'Nenhum token fornecido' });

    const[ schema, token ] = parts;

    if(!/^Bearer$/i.test(schema))
        return res.status(401).send({ success: false, message: 'Token inválido' });

    jwt.verify(token, authConfig.secret, async (error, decoded) => {
        if(error) 
        return res.status(401).send({ success: false, message: 'Token inválido' });

        const { id } = decoded;
        const user = await User.findOne({ where: { id } });
        
        if(!user) 
        return res.status(404).send({ success: false, message: 'Usuário inexistente' });

        res.locals.userId = id;
        return next();
    });
}