
const mongoose = require('mongoose');
const Document = require('../models/subSchemas/DocumentSchema');
const { extrairMetadadosDoPDF } = require('../utils/Metadata');

async function addDocument(req) {
    console.log(req.body)
    if (!req.body._id || req.body._id.length !== 24) {
        throw new Error('Invalid _id');
    }
    
    const project = await this.findById(req.body._id);

    // Cria um novo ObjectId
    const _id = new mongoose.Types.ObjectId();

    const metadata = await extrairMetadadosDoPDF(req.file.path);
    console.log(metadata)

    const newDocument = new Document({
        _id,
        name: req.file.filename,
        title: metadata.title,
        description: metadata.description,
        uploadDate: new Date(),
        URL: req.file.filename,
        author: metadata.author,
        doi: metadata.identifier,
        publisher: metadata.publisher,
        subject: metadata.subject,
        issn: metadata.issn,
        creator: metadata.creator,
        producer: metadata.producer
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