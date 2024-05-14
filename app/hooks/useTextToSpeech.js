"use client";

export default function useTextToSpeech  (translation, lang) {
    /**
     * This variable is the one that will store the voices that the browser has kekw
     * @type {Array}
     */
    let voice = []
    const language = lang === 'Filipino' ? 'fil-PH' : 'en-US';

    const voices = window.speechSynthesis.getVoices();
    if(Array.isArray(voices) && voices.length > 0){
        voice = voices
    }

    if('onvoiceschanged' in window.speechSynthesis){
        window.speechSynthesis.onvoiceschanged = function(){
            const voices = window.speechSynthesis.getVoices();
            voice = voices
        }
    }

    const availableVoice = voice.filter(({ lang }) => lang === language);
    console.log(availableVoice)
    const activeVoice = availableVoice?.find(({ name }) => name.includes('Google')) || availableVoice?.find(({ name }) => name.includes('David')) || availableVoice?.find(({ name }) => name.includes('Angelo'))

    let utterance = new SpeechSynthesisUtterance(translation);
    if(!activeVoice) return;
    utterance.voice = activeVoice;
    window.speechSynthesis.speak(utterance);

    return;
}