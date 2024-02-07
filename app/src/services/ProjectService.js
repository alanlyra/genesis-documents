
const mongoose = require('mongoose');
const Document = require('../models/subSchemas/DocumentSchema');


async function addDocument(req) {
    console.log(req.body)
    if (!req.body._id || req.body._id.length !== 24) {
        throw new Error('Invalid _id');
    }
    
    const project = await this.findById(req.body._id);

    // Cria um novo ObjectId
    const _id = new mongoose.Types.ObjectId();

    const newDocument = new Document({
        _id,
        name: req.file.filename,
        description: "2 blablabla qualquer coisa",
        uploadDate: new Date(),
        URL: req.file.filename,
    });

    try {
        const document = await newDocument.save();
        
        project.bibliometrics.documents.push(document);

        await project.save();
        
        return document;
    } catch (error) {
        throw new Error(error);
    }
    // Salva o documento
    
    
}

module.exports = {
    addDocument
};