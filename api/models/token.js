const con = require("../models/conexaoSeq")

const token = con.banco.define("tokens",{
    Email:{
        type: con.sequelize.STRING
    },
    Token:{
        type: con.sequelize.STRING
    }
})

module.exports = token