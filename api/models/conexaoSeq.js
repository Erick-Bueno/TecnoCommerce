const sequelize = require("sequelize")
const banco = new sequelize("ecommerce", "root", "sirlei231",{
    host: "localhost",
    dialect: "mysql"
})

module.exports = {
    sequelize: sequelize,
    banco: banco
}