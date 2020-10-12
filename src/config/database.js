require('dotenv').config();

module.exports = {
    dialect:'postgres',
    host:process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    define: {
        //cria created_at uptaded_at
        timestamps: true,
        //nome de tabelas e colunas com underline
        underscored: true,
    },
};