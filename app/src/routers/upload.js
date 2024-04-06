// Rotas para verificar se a API está funcionando
const express = require('express')
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const router = new express.Router()
const Projects = require('../models/Projects')
const uploadPDF = require('../middleware/uploadPDF')

router.post('/upload', uploadPDF, async (req, res) => {

    try {
        const fileManifestName = req.query.fileManifestName;
        const document = await Projects.addDocument(req)
        await document.preProcessing()

        //await roadmapping(document)

        const project = await Projects.findById(req.body._id).populate('bibliometrics.documents');
        if (!project) {
        return res.status(404).send({ message: 'Project not found' });
    }

    // Crie o caminho para o arquivo .mf
    const mfPath = path.join('files/manifests/', `${fileManifestName}`);

    // Verifique se o arquivo .mf já existe
    if (!fs.existsSync(mfPath)) {
      fs.writeFileSync(mfPath, '');
    }

    // Adicione o nome do documento ao arquivo .mf
    fs.appendFileSync(mfPath, `${document.name}\n`);

    console.log("Manifest: " + fileManifestName)

    res.send(project.bibliometrics.documents);
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
});

async function roadmapping(document) {

    let response = null;
    try {
        console.log("Roadmapping document: " + document._id)
        response = await axios.get('http://roadmap-service:4102/roadmap/document/' + document._id)
        console.log("Finished roadmapping document: " + document._id)
        return response
    } catch (error) {
        console.log(error);
    }
    return response
}

module.exports = router