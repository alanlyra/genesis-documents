// Rotas para verificar se a API está funcionando
const express = require('express')
const multer = require('multer');
const router = new express.Router()
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'pdfDocs/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {

    try {
        res.send("Arquivo enviado com sucesso!")
    } catch (e) {
        res.sendStatus(400)
    }
});

//chamar o preprocessing que estará dentro de services

module.exports = router