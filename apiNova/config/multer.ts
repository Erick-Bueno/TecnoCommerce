import { randomUUID } from 'crypto'
import multer from 'multer'
import path from 'path'



//configurando local onde as imgs devem ser salvas
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/")
    },
//configurando nome da img para q n haja repetição
    filename: function(req, file, cb){
        var uuid = randomUUID()
        cb(null, uuid+file.originalname )
    }
})

const upload = multer({storage})

export default upload;