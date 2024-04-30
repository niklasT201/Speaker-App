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
  } else {
    alert("Text-to-Speech not supported by your browser.");
  }
}

function changeTextToStory() {
  // Replace with actual story content or fetch from a database
  document.getElementById("text").innerText = "Once upon a time, there was a brave little fox...";
}

function changeTextToPoem() {
  // Replace with actual poem content or fetch from a database
  document.getElementById("text").innerText = "Twinkle, twinkle, little star...";
}

function speakUserText() {
  let userText = document.getElementById("userText").value;
  if (window.speechSynthesis) {
    let utterance = new SpeechSynthesisUtterance(userText);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
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

