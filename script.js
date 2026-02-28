const startBtn = document.getElementById("start-btn");
const chatBox = document.getElementById("chat-box");

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'ar-SA';

startBtn.addEventListener("click", ()=> recognition.start());

recognition.onresult = (event) => {
  const userText = event.results[0][0].transcript;
  const pUser = document.createElement("p");
  pUser.textContent = "أنت: " + userText;
  chatBox.appendChild(pUser);

  const reply = "مرحبًا! هذا رد افتراضي.";
  const pBot = document.createElement("p");
  pBot.textContent = "مساعد: " + reply;
  chatBox.appendChild(pBot);

  const msg = new SpeechSynthesisUtterance(reply);
  msg.lang = 'ar-SA';
  window.speechSynthesis.speak(msg);
};
