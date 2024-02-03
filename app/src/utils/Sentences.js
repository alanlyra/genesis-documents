const fs = require('fs');
const path = require('path');

const directoryPath = 'uploads'; // diretório onde está o arquivo 1.txt

const filePath = path.join(directoryPath, '1.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Erro ao ler o arquivo: ${err}`);
    return;
  }

  const sentences = getSentences(data);

  const result = sentences.reduce((acc, sentence, index) => {
    if (sentence.split(' ').length >= 5) {
      acc.push({ index: index + 1, sentence });
    }
    return acc;
  }, []);

  const jsonResult = JSON.stringify(result, null, 2);

  fs.writeFile('output.json', jsonResult, 'utf8', (err) => {
    if (err) {
      console.error(`Erro ao escrever o arquivo JSON: ${err}`);
    } else {
      console.log('Arquivo JSON criado com sucesso: output.json');
    }
  });
});

function getSentences(text) {
  // Adaptar conforme necessário para considerar diferentes pontuações, etc.
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  return sentences || [];
}
