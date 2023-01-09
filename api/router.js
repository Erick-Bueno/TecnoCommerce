const express = require("express")
const router = express.Router()
const user = require("./models/User")
const token = require("./models/token")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { json } = require("body-parser")
require("dotenv").config();
//fazer validação posteriormente
router.post("/cadastro", async function(req, res){
        const {Nome, Email, Senha} = req.body
        const dado = await user.findOne({where:{Email: Email}})
        if(dado){
            return res.json({erro:"email ja cadastrado" }).status(404)
        }
        const senhaCripto = await bcrypt.hash(Senha, 10)
        const SaveDados = await user.create({Nome: Nome, Email:Email, Senha: senhaCripto})
        const usuario = await user.findOne({where:{Email: Email}})
        const id = usuario.id
        const tokenjwt = jwt.sign({id},process.env.SECRET,{expiresIn:500})
        const saveToken = await token.create({Email:Email, Token: tokenjwt})
        const resp = {
            token: tokenjwt, 
            id: id
        }
        return res.json({msg: resp}).status(202)
        
   

})

router.post("/login", async function(req, res){
    const {Email, Senha} = req.body
    try {
        const verificarEmail = await user.findOne({where:{Email: Email}})
        if(!verificarEmail){
                return res.json({erro:"email não cadastrado"}).status(400)
        }
        const senhaBanco = verificarEmail.Senha
        const descript = await bcrypt.compare(Senha, senhaBanco)
        if(descript == false){
            return res.json({erro:"senha incorreta"}).status(400)
        }
        const id = verificarEmail.id
        const tokenjwt = jwt.sign({id},process.env.SECRET,{expiresIn:500})
        const attToken = await token.update({Token: tokenjwt},{where:{email: Email}})
        const resp = {
            token: tokenjwt,
            id: id
        }
        return res.json({msg: resp}).status(200)
    } catch (error) {
        return res.json(error.msg).status(400)
    }
})


module.exports = router