function convertTextToSpeech() {
  var text = document.getElementById('text').value;
  var words = text.split(' ');
  
  playWords(words, 0);
}

function playWords(words, index) {
  if (index < words.length) {
    var utterance = new SpeechSynthesisUtterance(words[index]);
    
    utterance.onend = function() {
      setTimeout(function() {
        playWords(words, index + 1);
      }, 200); // Pausendauer zwischen den Wörtern in Millisekunden (hier: 200ms)
    };
    
    speechSynthesis.speak(utterance);
  }
}
