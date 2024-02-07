
//const jsonResult = JSON.stringify(result, null, 2);

function splitTextIntoSentences(text) {
  const sentences = getSentences(text);

  const result = sentences.reduce((acc, sentence, index) => {
    if (sentence.split(' ').length >= 5) {
      acc.push({ index: index + 1, sentence });
    }
    return acc;
  }, []);
  console.log(result)
  return result
}

function getSentences(text) {
  // Adaptar conforme necessário para considerar diferentes pontuações, etc.
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  return sentences || [];
}

module.exports.splitTextIntoSentences = splitTextIntoSentences;