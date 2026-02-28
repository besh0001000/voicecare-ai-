const startBtn = document.getElementById('start-btn');
const chatBox = document.getElementById('chat-box');

// محرك تحويل النص إلى كلام (النطق)
function speak(text, lang) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9; // سرعة هادئة تناسب كبار السن
    window.speechSynthesis.speak(utterance);
}

// إعداد التعرف على الصوت
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    startBtn.addEventListener('click', () => {
        // ترحيب أولي باللغتين
        speak("مرحباً بك، أنا مساعدك الصوتي. كيف يمكنني مساعدتك؟", "ar-SA");
        chatBox.innerText = "جاري الاستماع... Listening...";
        recognition.lang = 'ar-SA'; // يبدأ بالاستماع للعربية
        recognition.start();
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        chatBox.innerHTML = `<strong>لقد قلت:</strong> ${transcript}`;

        // تحليل الأوامر الذكية (عربي وإنجليزي)
        if (transcript.includes("دواء") || transcript.includes("medicine")) {
            speak("تذكير: حان وقت تناول دواء الضغط الآن.", "ar-SA");
            chatBox.innerText = "تم تفعيل تذكير الدواء 💊";
        } 
        else if (transcript.includes("طوارئ") || transcript.includes("emergency") || transcript.includes("help")) {
            speak("جاري الاتصال بالطوارئ وإرسال موقعك الآن. ابقَ هادئاً.", "ar-SA");
            chatBox.innerText = "🚨 جاري طلب المساعدة...";
        }
        else if (transcript.includes("hello") || transcript.includes("كيف حالك")) {
            speak("I am fine, how can I help you today?", "en-US");
            chatBox.innerText = "Hello! How can I help?";
        }
        else {
            speak("وصلت رسالتك، سأقوم بمساعدتك فوراً.", "ar-SA");
        }
    };

    recognition.onerror = () => {
        chatBox.innerText = "عذراً، لم أسمعك جيداً. اضغط مرة أخرى.";
    };

} else {
    chatBox.innerText = "المتصفح لا يدعم تقنية الصوت.";
}
