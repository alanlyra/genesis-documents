const Conversion = require('../utils/Conversion');

async function preProcessing(req) {
    const project = await this.findById(req.body._id);


    // project.bibliometrics.documents.push({
    //     name: req.file.filename,
    //     description: "2 blablabla qualquer coisa",
    //     uploadDate: new Date(),
    //     URL: req.file.filename,
    // });

    // Iterando sobre os documentos em bibliometrics e atualizando o campo preprocessing.text
    await Promise.all(project.bibliometrics.documents.map(async (document) => {
        const text = await Conversion.convertPDFtoText(req);
        console.log(text);
        document.preprocessing.text = text;
        project.save()
    }));
    try {
        await project.save();
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    preProcessing
};