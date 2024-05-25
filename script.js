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
     document.getElementById("unsupportedMessage").innerText = "Speech recognition is not supported in this browser.";
   }
 }

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

 // Functions for changing text to stories and poems, dark mode toggle, etc.

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
   }, 100);
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
   const rhymingLine2 = rhymingLines[Math.floor(Math.random() * rhymingLines.length)];
   const concludingLine = concludingLines[Math.floor(Math.random() * concludingLines.length)];

   const poem = `${firstLine}\n${rhymingLine1}\n${rhymingLine2}\n${concludingLine}`;
   const textElement = document.getElementById("text");

   textElement.classList.add('text-transition');
   setTimeout(() => {
     textElement.innerText = poem;
     example.style.display = "block";
   }, 100);
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

 // Functions for generating and downloading audio

 function generateAudio() {
   const userText = document.getElementById("userText").value;
   if (window.speechSynthesis) {
     const utterance = new SpeechSynthesisUtterance(userText);
     utterance.lang = 'en-US';

     utterance.onend = function(event) {
       alert('Speech has finished.');
       // Placeholder: Implement audio download logic here
     };

     speechSynthesis.speak(utterance);
   } else {
     alert("Text-to-Speech not supported by your browser.");
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
     });
 }

 // Dark Mode Toggle Logic

 const bodyElement = document.body;
 const darkModeToggle = document.getElementById('darkModeToggle');
 const orangeElements = document.querySelectorAll('button');
 const footerElement = document.querySelector('footer');
 const headerElement = document.querySelector('header');
 const textareaElement = document.querySelector('textarea');

 const isDarkMode = localStorage.getItem('darkMode') === 'true';

 if (isDarkMode) {
   bodyElement.classList.add('dark-mode');
   orangeElements.forEach(element => element.style.backgroundColor = '#6F309F');
   footerElement.style.backgroundColor = '#222';
   headerElement.style.backgroundColor = '#6F309F';
   darkModeToggle.checked = true;
   textareaElement.style.backgroundColor = '#333';
   textareaElement.style.color = '#ddd';
 } else {
   bodyElement.classList.remove('dark-mode');
   orangeElements.forEach(element => element.style.backgroundColor = '');
   footerElement.style.backgroundColor = '#f0f8ff';
   headerElement.style.backgroundColor = '#ffd700';
   textareaElement.style.backgroundColor = '';
   textareaElement.style.color = '';
 }

 darkModeToggle.addEventListener('change', function() {
   if (darkModeToggle.checked) {
     bodyElement.classList.add('dark-mode');
     orangeElements.forEach(element => element.style.backgroundColor = '#6F309F');
     footerElement.style.backgroundColor = '#222';
     headerElement.style.backgroundColor = '#6F309F';
     textareaElement.style.backgroundColor = '#333';
     textareaElement.style.color = '#ddd';
     localStorage.setItem('darkMode', 'true');
   } else {
     bodyElement.classList.remove('dark-mode');
     orangeElements.forEach(element => element.style.backgroundColor = '');
     footerElement.style.backgroundColor = '#f0f8ff';
     headerElement.style.backgroundColor = '#ffd700';
     textareaElement.style.backgroundColor = '';
     textareaElement.style.color = '';
     localStorage.setItem('darkMode', 'false');
   }
 });

 const button = document.getElementById('hearButton');
 const image = document.getElementById('hearImage');

 window.addEventListener('resize', function() {
   if (window.innerWidth <= 650) {
     button.textContent = "";
     image.style.display="block";
   } else {
     button.textContent = "Hear Sparky Speak!";
     image.style.display="none";
   }
 });