const Conversion = require('../utils/Conversion');

async function preProcessing() {
    const document = this

    const text = await Conversion.convertPDFtoText(document);

    document.preprocessing.text = text

    try {
        await document.save();
    } catch (error) {
        throw new Error(error);
    }
    
}

module.exports = {
    preProcessing
};