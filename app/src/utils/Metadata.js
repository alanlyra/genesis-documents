const fs = require('fs').promises;
const pdf = require('pdf-parse');

async function extrairMetadadosDoPDF(file) {
    try {
        // Lendo o arquivo PDF
        const dataBuffer = await fs.readFile(file);

        // Convertendo o buffer de dados para texto
        const data = await pdf(dataBuffer);

        // Extraindo metadados
        const metadata = {
            title: data.info.Title,
            author: data.info.Author,
            doi: data.metadata._metadata['dc:identifier'],
            publisher: data.metadata._metadata['dc:publisher'],
            subject: data.metadata._metadata['dc:subject'],
            issn: data.metadata._metadata['prism:issn'],
            creator: data.metadata._metadata['dc:creator'],
            description: data.metadata._metadata['dc:description'],
            producer: data.info.Producer,
            creationDate: data.info.CreationDate,
            modDate: data.info.ModDate
        };

        return metadata;
    } catch (error) {
        console.error('Erro ao extrair metadados do PDF:', error);
        throw error;
    }
}

module.exports.extrairMetadadosDoPDF = extrairMetadadosDoPDF;