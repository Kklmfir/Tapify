let recognition;

try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    recognition = new SpeechRecognition();
    recognition.lang = "id-ID";

    recognition.onresult = async (event) => {
        const text = event.results[0][0].transcript;
        alert("Perintah suara: " + text);
    };
} catch (e) {
    console.log("Browser tidak mendukung voice recognition");
}

document.getElementById("voiceBtn").onclick = () => {
    if (recognition) recognition.start();
};
