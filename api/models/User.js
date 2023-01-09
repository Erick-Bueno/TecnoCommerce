const con = require("../models/conexaoSeq")


const user = con.banco.define("users",{
    Nome:{
        type: con.sequelize.STRING
    },
    Email:{
        type: con.sequelize.STRING
    },
    Senha:{
        type: con.sequelize.STRING
    }
})

module.exports = user