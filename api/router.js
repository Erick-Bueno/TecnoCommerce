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
            const resperror = {
                erro: "email ja cadastrado",
                status: 404
            }
            return res.json({msg: resperror }).status(404)
        }
        const senhaCripto = await bcrypt.hash(Senha, 10)
        const SaveDados = await user.create({Nome: Nome, Email:Email, Senha: senhaCripto})
        const usuario = await user.findOne({where:{Email: Email}})
        const id = usuario.id
        const tokenjwt = jwt.sign({id},process.env.SECRET,{expiresIn:500})
        const saveToken = await token.create({Email:Email, Token: tokenjwt})
        const resp = {
            token: tokenjwt, 
            id: id,
            status: 200
        }
        return res.json({msg: resp}).status(202)
        
   

})

router.post("/login", async function(req, res){
    const {Email, Senha} = req.body
    try {
        const verificarEmail = await user.findOne({where:{Email: Email}})
        if(!verificarEmail){
                const respError = {
                    erro: "email não cadastrado",
                    status: 405
                }
                return res.json({msg: respError}).status(405)
        }
        const senhaBanco = verificarEmail.Senha
        const descript = await bcrypt.compare(Senha, senhaBanco)
        if(descript == false){
            const resperror2 = {
                erro: "senha incorreta",
                status: 406
            }
            return res.json({msg: resperror2}).status(406)
        }
        const id = verificarEmail.id
        const tokenjwt = jwt.sign({id},process.env.SECRET,{expiresIn:500})
        const attToken = await token.update({Token: tokenjwt},{where:{email: Email}})
        const resp = {
            token: tokenjwt,
            id: id, 
            status: 200
        }
        return res.json({msg: resp}).status(200)
    } catch (error) {
        return res.json(error.msg).status(400)
    }
})

router.get("/user/:id", async function(req, res){
    const id = req.params.id
    const usuario = await user.findOne({where:{id: id}})
    return res.status(200).json({usuario})
})


module.exports = router