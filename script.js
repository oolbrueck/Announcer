var words = [];

function convertTextToSpeech() {
  console.log("words: " + words);
  let playlist = createPlaylist();
  console.log(playlist);
  playWords(playlist, 0);
}

function playWords(words, index) {
  const breakInMilliseconds = document.getElementById('break-time').value;

  if (index < words.length) {
    var utterance = new SpeechSynthesisUtterance(words[index]);
    
    utterance.onend = function() {
      setTimeout(function() {
        playWords(words, index + 1);
      }, breakInMilliseconds); // Pausendauer zwischen den Wörtern in Millisekunden (hier: 200ms)
    };
    
    speechSynthesis.speak(utterance);
  }
}

function addChip() {
  const chipsContainer = document.getElementById('chips-container');
  const chipInput = document.getElementById('chip-input');

  const chipText = chipInput.value;

  if (chipText.trim() !== '') {
    const chipDiv = document.createElement('div');
    chipDiv.classList.add('chip');

    words.push(chipText);
    chipDiv.textContent = chipText;

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('closebtn');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function() {
      this.parentElement.style.display = 'none';
      console.log(this.parentElement.childNodes[0].textContent);
      const index = words.indexOf(this.parentElement.childNodes[0].textContent);
      if (index !== -1) {
        words.splice(index, 1);
      }
    };
    chipDiv.appendChild(closeBtn);
    chipsContainer.appendChild(chipDiv);
    chipInput.value = '';
  }
}

function createPlaylist() {
  let playlist = [];
  const numberOfAnnouncements = document.getElementById('number-of-announcements-input').value;
  console.log("numberOfAnnouncements" + numberOfAnnouncements)

  for(let i = 0; i < numberOfAnnouncements; i++) {
    playlist.push(words[Math.floor(Math.random() * words.length)])
  }
  return playlist;
}

