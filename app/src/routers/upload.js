// Rotas para verificar se a API está funcionando
const express = require('express')
const router = new express.Router()
const Projects = require('../models/Projects')
const uploadPDF = require('../middleware/uploadPDF')

router.post('/upload', uploadPDF, async (req, res) => {

    try {
        const document = await Projects.addDocument(req)
        await document.preProcessing()

        const project = await Projects.findById(req.body._id).populate('bibliometrics.documents');
        if (!project) {
        return res.status(404).send({ message: 'Project not found' });
    }

    res.send(project.bibliometrics.documents);
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
});

//chamar o preprocessing que estará dentro de services

module.exports = router