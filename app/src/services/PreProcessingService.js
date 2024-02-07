const { convertPDFtoText } = require('../utils/Conversion');
// const { splitTextIntoSentences } = require('../utils/Sentences');

async function preProcessing() {
    const document = this

    const text = await convertPDFtoText(document);  
    // const sentences = await splitTextIntoSentences(text);

    document.preprocessing.text = text
    // document.preprocessing.sentences = sentences;

    try {
        await document.save();
    } catch (error) {
        throw new Error(error);
    }
    
}

module.exports = {
    preProcessing
};