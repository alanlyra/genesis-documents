// Rotas para verificar se a API está funcionando
const express = require('express')
const router = new express.Router()
const Projects = require('../models/Projects')
const uploadPDF = require('../middleware/uploadPDF')

router.post('/upload', uploadPDF, async (req, res) => {

    try {
        const document = await Projects.addDocument(req)
        await document.preProcessing()
        res.send("Documentos pré-processados com sucesso!")
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
});

//chamar o preprocessing que estará dentro de services

module.exports = router