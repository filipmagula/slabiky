const slabiky = ["ma", "Ma", "me", "me", "Le", "má", "mé", "lá", "Lé", "Lá", "ma", "me", "la", "le", "ma", "mé", "Má", "Lá", "Lé", "LE", "LA", "Sa", "sá", "sé", "SA", "sa", "se", "Sá", "Sé", "sa", "ma", "MÁ", "SE", "se", "le", "lé", "MA", "na", "La", "Sá", "La", "Sá", "SA", "SA", "ME", "LE", "Ála", "máma", "ELA", "MÍLA", "Emil", "Ola", "eso", "Ema", "Eva", "Véna", "sele", "máme", "sama", "Álo", "Emo", "Elo", "Mo", "mo", "So", "so", "MO", "SO", "Mó", "mó", "Só", "só", "Mó", "Só", "Ema", "Ela", "Ola", "Ála", "Emo!", "Elo!", "Olo!", "Álo!"];
let currentIndex = 0;

let synth;
let voice;

let attempts = 0;
function loadVoices() {
  attempts++;
  const voices = synth.getVoices();
  if (voices.length) {
    voice = voices.find(_voice => /cs[-_]CZ/.test(_voice.lang));
  }
  if (!voice) {
    if (attempts < 10) {
      setTimeout(() => {
        loadVoices();
      }, 250);
    } else {
      console.error('`cs-CZ` voice not found.');
    }
  }
}

if ('speechSynthesis' in window) {
  synth = window.speechSynthesis;
  loadVoices();
}

document.getElementById("readButton").addEventListener("click", readCurrentSlabika);
document.getElementById("nextButton").addEventListener("click", showNextSlabika);

function readCurrentSlabika() {
    let synth = window.speechSynthesis;
    let utterance = new SpeechSynthesisUtterance(slabiky[currentIndex].toLocaleLowerCase());
    utterance.lang = 'cs-CZ';
	utterance.rate = 0.6; // Rychlost mluvení (1 je normální rychlost)
    utterance.pitch = 1.5; // Výška hlasu (1 je normální výška)
    utterance.voice = voice;
    synth.speak(utterance);
}

function showNextSlabika() {
    currentIndex = Math.floor(Math.random() * slabiky.length);
    document.getElementById("slabika").textContent = slabiky[currentIndex];
}
