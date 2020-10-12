const enviroment_test = {
    username: "ygndgpdtzvryku",
    password: "8f859b397a4a555b3bbd00e7d3f11d4ff4ddc903ceaa76be690428a6ca64fa6c",
    database: "delrq6bglti9k3",
    host: "ec2-3-215-83-17.compute-1.amazonaws.com",
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    },
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
}
const enviroment_local = {
    username: 'postgres',
    password: '',
    database: 'price_buddy',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: true,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
}

module.exports = enviroment_test;