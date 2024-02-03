async function addDocument(req) {
    const project = await this.findById(req.body._id);

    
    project.bibliometrics.documents.push({
        name: req.file.filename,
        description: "2 blablabla qualquer coisa",
        uploadDate: new Date(),
        URL: req.file.filename,
    });
    try {
        await project.save();
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    addDocument
};