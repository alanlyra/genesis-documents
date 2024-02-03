const fs = require('fs');
const path = require('path');
const PDFParser = require('pdf-parse');

// Função para converter um arquivo PDF em TXT
async function convertPDFtoText(req) {
  const pdfBuffer = fs.readFileSync(req.file.path);

  const data = await PDFParser(pdfBuffer);

  const textContent = fixTextFormatting(data.text);
  
  //console.log(textContent)
  return textContent;
}

// Função para consertar a formatação do texto
function fixTextFormatting(text) {
    // Substitui quebras de linha seguidas por um único espaço
    text = text.replace(/\n+/g, ' ');
  
    // Remove espaços em excesso antes e depois das linhas
    text = text.replace(/^\s+|\s+$/g, '');
  
    // Remove espaços em excesso entre palavras
    text = text.replace(/\s+/g, ' ');
  
    // Adiciona quebra de linha após cada ponto final
    text = text.replace(/\. /g, '.\n');
  
    return text;
  }

module.exports.convertPDFtoText = convertPDFtoText;
