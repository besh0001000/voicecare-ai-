const startBtn = document.getElementById('start-btn');
const chatBox = document.getElementById('chat-box');

// وظيفة النطق - Text to Speech
function speak(text) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = 'ar-SA';
    window.speechSynthesis.speak(msg);
}

// إعداد التعرف على الصوت
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    chatBox.innerText = "متصفحك لا يدعم التعرف على الصوت. جرب Chrome.";
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA'; // لغة الاستماع
    recognition.interimResults = false;

    startBtn.onclick = () => {
        recognition.start();
        chatBox.innerText = "أنا أسمعك الآن... تحدث";
        // ترحيب صوتي عند البدء
        speak("كيف يمكنني مساعدتك؟");
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        chatBox.innerText = "قلت: " + transcript;

        // تنفيذ الأوامر المفتاحية
        if (transcript.includes("طوارئ") || transcript.includes("مساعدة")) {
            handleEmergency();
        } else if (transcript.includes("دواء") || transcript.includes("علاج")) {
            speak("تذكير: حان موعد الدواء.");
            chatBox.innerText = "💊 تم تفعيل تنبيه الدواء";
        }
    };
}

// وظيفة الطوارئ والـ GPS
function handleEmergency() {
    speak("جاري تحديد موقعك وإرسال طلب استغاثة.");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            chatBox.innerHTML = `🚨 طوارئ! <br> موقعك: ${lat}, ${lon}`;
            speak("تم تحديد موقعك بنجاح.");
        }, () => {
            speak("فشل تحديد الموقع، تأكد من تفعيل الـ GPS.");
        });
    }
}
