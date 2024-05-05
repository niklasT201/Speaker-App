// Speech Recognition Functionality
let recognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
} else if ('SpeechRecognition' in window) {
  recognition = new SpeechRecognition();
} else {
  console.log("Speech recognition not supported in this browser.");
}

if (recognition) {
  recognition.lang = 'en-US';
  recognition.onresult = function(event) {
    let text = event.results[0][0].transcript;
    console.log("Recognized text:", text);
    document.getElementById("userText").value = text;
  };

  recognition.onerror = function(event) {
    console.log("Speech recognition error:", event.error);
  };
} else {
  console.log("Speech recognition not available.");
}

function startSpeechRecognition() {
  if (recognition) {
    recognition.start();
  } else {
    /* console.log("Speech recognition not available."); */
    document.getElementById("unsupportedMessage").innerText = "Speech recognition is not supported in this browser.";
  }
}

// Speech Recognition Functionality
/* let text = event.result[0].transcript; */
let text = null; 
document.getElementById("userText").value = text;

function speak() {
  let text = document.getElementById("text").innerText;
  if (window.speechSynthesis) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
    document.getElementById("downloadButton").style.display = "block";
  } else {
    alert("Text-to-Speech not supported by your browser.");
  }
}

const example = document.getElementById("exampleSection");
const info = document.getElementById("info");

function showExample() {
  if (example.style.display === "none") {
    example.style.display = "block";
  } else {
    example.style.display = "none";
  }
}

function showInfo() {
  if (info.style.display === "none") {
    info.style.display = "block";
  } else {
    info.style.display = "none";
  }
}

const storyBeginnings = [
  "Once upon a time, in a faraway land...",
  "In a bustling metropolis, a young inventor...",
  "On a distant planet, a spaceship carrying very important food..."
];

const storyMiddles = [
  "encountered a strange creature with...",
  "discovered a hidden portal leading to another Dimension...",
  "faced a challenge that required lots of knowledge and skill..."
];

const storyEnds = [
  "and lived happily ever after.",
  "ultimately triumphed, saving the day.",
  "learned a valuable lesson about friendship and loyalty..."
];

function changeTextToStory() {
  const beginning = storyBeginnings[Math.floor(Math.random() * storyBeginnings.length)];
  const middle = storyMiddles[Math.floor(Math.random() * storyMiddles.length)];
  const end = storyEnds[Math.floor(Math.random() * storyEnds.length)];

  const story = `${beginning} ${middle} ${end}`;
  const textElement = document.getElementById("text");

  textElement.classList.add('text-transition');
  setTimeout(() => {
    textElement.innerText = story;
    example.style.display = "block";
  }, 100); // Adjust the delay (in milliseconds) if needed
}

const firstLines = [
  "The sun dips low, casting shadows long...",
  "A gentle breeze whispers through rustling leaves...",
  "Beneath the starry sky, a lone wolf cries..."
];

const rhymingLines = [
  "Birds sing their sweet songs, a joyful sound.",
  "Memories dance in the mind, a carousel unbound.",
  "Dreams take flight on wings of hope, soaring high."
];

const concludingLines = [
  "A moment of peace before the coming night.",
  "A symphony of nature, a beautiful sight.",
  "A reminder of the beauty that surrounds us all."
];

function changeTextToPoem() {
  const firstLine = firstLines[Math.floor(Math.random() * firstLines.length)];
  const rhymingLine1 = rhymingLines[Math.floor(Math.random() * rhymingLines.length)];
  const rhymingLine2 = rhymingLines[Math.floor(Math.random() * rhymingLines.length)]; // Ensure different rhyming lines (optional)
  const concludingLine = concludingLines[Math.floor(Math.random() * concludingLines.length)];

  const poem = `${firstLine}\n${rhymingLine1}\n${rhymingLine2}\n${concludingLine}`;
  const textElement = document.getElementById("text");

  textElement.classList.add('text-transition');
  setTimeout(() => {
    textElement.innerText = poem;
    example.style.display = "block";
  }, 100); // Adjust the delay (in milliseconds) if needed
}

function speakUserText() {
  let userText = document.getElementById("userText").value;
  if (window.speechSynthesis) {
    let utterance = new SpeechSynthesisUtterance(userText);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
    document.getElementById("downloadButton").style.display = "block";
  } else {
    alert("Text-to-Speech not supported by your browser.");
  }
}

function generateAudio() {
  const userText = document.getElementById("userText").value;
  const audioCtx = new AudioContext();
  let isDownloading = false; // Flag to track download progress

  if (window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(userText);
    utterance.lang = 'en-US';

    // Connect utterance to audio context for audio generation
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    const source = audioCtx.createBufferSource();

    utterance.onend = function(event) {
      if (!isDownloading) { // Check download flag
        source.start(); // Start audio playback before download (if not already downloading)
        source.stop();
        downloadAudio(source.buffer);
        isDownloading = true; // Set flag after download starts
      }
    };

    speechSynthesis.speak(utterance);
  } else {
    alert("Text-to-Speech not supported by your browser.");
  }
}

function downloadAudio(audioBuffer) {
  const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });

  if (window.URL.createObjectURL) {
    const audioURL = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = audioURL;
    link.download = 'sparkys_speech.mp3';
    link.click();
    window.URL.revokeObjectURL(audioURL); // Clean up temporary URL
  } else {
    alert("Downloading audio not supported by your browser.");
  }
}


function translateText() {
  const sourceLang = document.getElementById("sourceLang").value;
  const targetLang = document.getElementById("targetLang").value;
  const textToTranslate = document.getElementById("userText").value;

  // Replace 'YOUR_API_KEY' with your actual Google Translate API key
  const apiKey = 'YOUR_API_KEY';

  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}&q=${textToTranslate}&target=${targetLang}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const translatedText = data.data.translations[0].translatedText;
      document.getElementById("translatedText").innerText = translatedText;
    })
    .catch(error => {
      console.error("Translation error:", error);
      // Handle translation errors (optional)
    });
}

// Placeholder function, replace with actual API call
function translate(text, sourceLang, targetLang) {
  // Use your chosen translation API's function to translate text
  // This is a placeholder and won't work without actual API integration
  return "This text is translated from " + sourceLang + " to " + targetLang;
}

const bodyElement = document.body;
const darkModeToggle = document.getElementById('darkModeToggle');
const orangeElements = document.querySelectorAll('button'); // Select buttons
const footerElement = document.querySelector('footer'); // Select the footer element
const headerElement = document.querySelector('header'); // Select the footer element
const textareaElement = document.querySelector('textarea'); // Select the footer element

// Check for stored dark mode preference on page load
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Set initial styles based on stored preference
if (isDarkMode) {
  bodyElement.classList.add('dark-mode');
  orangeElements.forEach(element => element.style.backgroundColor = '#6F309F');
  footerElement.style.backgroundColor = '#222';
  headerElement.style.backgroundColor = '#6F309F';
  darkModeToggle.checked = true; // Set toggle to reflect preference
  textareaElement.style.backgroundColor = '#333'; // Set dark gray background color for footer in dark mode
  textareaElement.style.color = '#ddd';
} else {
  bodyElement.classList.remove('dark-mode');
  orangeElements.forEach(element => element.style.backgroundColor = '');
  footerElement.style.backgroundColor = '#f0f8ff';
  headerElement.style.backgroundColor = '#ffd700';
  textareaElement.style.backgroundColor = ''; // Reset footer background color to light blue
  textareaElement.style.color = '';
}

darkModeToggle.addEventListener('change', function() {
  if (darkModeToggle.checked) {
    bodyElement.classList.add('dark-mode');
   orangeElements.forEach(element => element.style.backgroundColor = '#6F309F'); // Set dark purple background color for buttons
    footerElement.style.backgroundColor = '#222'; // Set dark gray background color for footer in dark mode
    headerElement.style.backgroundColor = '#6F309F'; // Set dark gray background color for footer in dark mode
    textareaElement.style.backgroundColor = '#333'; // Set dark gray background color for footer in dark mode
    textareaElement.style.color = '#ddd';
    localStorage.setItem('darkMode', 'true'); // Store preference in local storage
  } else {
    bodyElement.classList.remove('dark-mode');
    orangeElements.forEach(element => element.style.backgroundColor = ''); // Reset button background color
    footerElement.style.backgroundColor = '#f0f8ff'; // Reset footer background color to light blue
    headerElement.style.backgroundColor = '#ffd700'; // Reset footer background color to light blue
    textareaElement.style.backgroundColor = ''; // Reset footer background color to light blue
    textareaElement.style.color = '';
    localStorage.setItem('darkMode', 'false'); // Store preference in local storage
  }
});

const button = document.getElementById('hearButton');
const image = document.getElementById('hearImage');

window.addEventListener('resize', function() {
  if (window.innerWidth <= 650) {
    button.textContent = ""; // Set button content to empty string
    image.style.display="block"; // Set button content to empty string
  } else {
    button.textContent = "Hear Sparky Speak!"; // Restore button text
    image.style.display="none"; // Set button content to empty string
  }
});





/* 
// Speech Recognition Functionality
let text = event.result[0].transcript;
document.getElementById("userText").value = text;

let recognition = new SpeechRecognition();

function startSpeechRecognition() {
  if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (stream) {
        console.log("Microphone permission granted.");
        recognition.start();
      })
      .catch(function (err) {
        console.log("Error accessing microphone:", err);
      });
  } else {
    console.log("getUserMedia not supported");
  }
}


recognition.onresult = function(event) {
  let text = event.result[0].transcript;
  console.log("Recognized text:", text);
  document.getElementById("userText").value = text;
};

recognition.onerror = function(event) {
  console.log("Speech recognition error:", event.error);
};
 */

