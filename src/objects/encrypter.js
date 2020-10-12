const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports = {
    createHash(password){
        return bcrypt.hashSync(password, salt);
    },
    async compareHash(password, hash){
        return bcrypt.compare(password, hash);
    }
};