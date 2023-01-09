const express = require("express")
const ex  = express()
const cors = require("cors")
const router = require("./router")
const body = require("body-parser")



ex.use(cors())
ex.use(body.urlencoded({extended:true}))
ex.use(body.json())
ex.use(router)
ex.listen("8055", function(){
    console.log("servidor rodando")
})