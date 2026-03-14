// --- DATE JOC ---
const verbe = [
    { ro: "a merge", en: "to go" }, { ro: "a manca", en: "to eat" },
    { ro: "a bea", en: "to drink" }, { ro: "a dormi", en: "to sleep" },
    { ro: "a vedea", en: "to see" }, { ro: "a vorbi", en: "to speak" },
    { ro: "a scrie", en: "to write" }, { ro: "a citi", en: "to read" },
    { ro: "a alerga", en: "to run" }, { ro: "a face", en: "to do" },
    { ro: "a veni", en: "to come" }, { ro: "a canta", en: "to sing" },
    { ro: "a lucra", en: "to work" }, { ro: "a sari", en: "to jump" },
    { ro: "a auzi", en: "to hear" }
];

// --- VARIABILE STARE ---
let vieti = 3;
let scor = 0;
let vitezaBaza = 1.0;
let vitezaCurenta = vitezaBaza;
let pozitieX = -200; 
let pozitieY = -200; 
let verbCurent = {};
let gameActive = true;
let esteInAnimatiePersonaj = false; 
let pauzaFantoma = false; 
let recognition; // Variabila pentru Speech API

// --- ELEMENTE DOM ---
const ghostCont = document.getElementById('container-fantoma');
const bubble = document.getElementById('bubble-cuvant');
const scorAfisat = document.getElementById('scor');
const ecranFinal = document.getElementById('ecran-final');
const titluFinal = document.getElementById('titlu-final');
const scorTextFinal = document.getElementById('scor-final');
const btnNext = document.getElementById('btn-next');
const personajElem = document.getElementById("personaj");
const statusMic = document.getElementById('status-microfon'); // Asigură-te că l-ai adăugat în HTML

const imaginiAnimatie = ["../images/idel.png", "../images/001.png", "../images/002.png", "../images/003.png"];

// --- CONFIGURARE VOCE ---

function initializareRecunoastereVocala() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!window.SpeechRecognition) {
        console.error("Browser-ul nu suportă Web Speech API");
        return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
        console.log("Detectat:", transcript);
        verificaRaspuns(transcript);
    };

    recognition.onend = () => {
        if (gameActive) recognition.start(); // Repornește automat ascultarea
    };

    recognition.onerror = (event) => {
        console.error("Eroare microfon:", event.error);
    };

    recognition.start();
}

async function verificaRaspuns(pronuntie) {
    if (!gameActive || pauzaFantoma) return;

    // Normalizăm input-ul: scoatem "to" de la început dacă există
    let raspunsUtilizator = pronuntie.replace(/^to\s+/, "");
    let raspunsCorect = verbCurent.en.replace(/^to\s+/, "");

    if (raspunsUtilizator === raspunsCorect || pronuntie === verbCurent.en) {
        scor += 10;
        scorAfisat.innerText = "Scor: " + scor;

        await pornesteAnimatiePersonaj(); 

        if (scor >= 100) {
            terminaJocul(true);
        } else {
            vitezaCurenta += 0.1;
            // spawnFantoma() este apelat la finalul animației personajului
        }
    }
}

// --- LOGICA JOCULUI ---

function spawnFantoma() {
    if (!gameActive) return;
    verbCurent = verbe[Math.floor(Math.random() * verbe.length)];
    bubble.innerText = verbCurent.ro;
    pozitieX = -200; 
    pozitieY = -100; 
}

function joc() {
    if (!gameActive) return;

    if (pauzaFantoma) {
        requestAnimationFrame(joc);
        return;
    }

    pozitieX += vitezaCurenta;
    pozitieY += vitezaCurenta * 0.5;
    ghostCont.style.right = pozitieX + "px";
    ghostCont.style.top = pozitieY + "px";

    if (pozitieX > window.innerWidth * 0.45) {
        pierdeViata();
    } else {
        requestAnimationFrame(joc);
    }
}

async function pierdeViata() {
    const inima = document.getElementById(`inima-${vieti}`);
    if (inima) {
        inima.classList.remove('plina');
        inima.classList.add('lovita');
    }
    vieti--;
    if (vieti <= 0) {
        terminaJocul(false);
    } else {
        spawnFantoma();
        requestAnimationFrame(joc); 
    }
}

async function terminaJocul(aCastigat) {
    gameActive = false;
    if (recognition) recognition.stop();
    
    ecranFinal.classList.remove('ascuns');
    scorTextFinal.innerText = "Scor final: " + scor;
    
    if (aCastigat) {
        titluFinal.innerText = "Felicitări! Ai Câștigat!";
        titluFinal.style.color = "#4caf50";
        btnNext.classList.remove('ascuns');
    } else {
        titluFinal.innerText = "Ai pierdut!";
        titluFinal.style.color = "#ff4d4d";
        btnNext.classList.add('ascuns');
    }
    await salveazaScorul(scor);
}

// --- ANIMATIE PERSONAJ ---

const asteaptaMs = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function seteazaIdlePersonaj() {
    if (personajElem) personajElem.style.backgroundImage = `url('${imaginiAnimatie[0]}')`;
}

async function pornesteAnimatiePersonaj() {
    if (esteInAnimatiePersonaj) return;
    esteInAnimatiePersonaj = true;
    pauzaFantoma = true; 

    for (let i = 1; i < imaginiAnimatie.length; i++) {
        await asteaptaMs(100);
        personajElem.style.backgroundImage = `url('${imaginiAnimatie[i]}')`;
    }

    personajElem.classList.add("stare-speciala");
    await asteaptaMs(500); 
    personajElem.classList.remove("stare-speciala");

    for (let i = imaginiAnimatie.length - 2; i >= 0; i--) {
        await asteaptaMs(100);
        personajElem.style.backgroundImage = `url('${imaginiAnimatie[i]}')`;
    }

    seteazaIdlePersonaj();
    esteInAnimatiePersonaj = false;
    pauzaFantoma = false; 
    
    if (gameActive) spawnFantoma(); 
}

// --- SALVARE SCOR ---

async function salveazaScorul(scorFinal) {
    try {
        await fetch('/api/battle/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 1, score: scorFinal, level: 1 })
        });
    } catch (e) { console.error("Eroare salvare scor"); }
}

// --- ANIMATIE VRĂJITOARE ---
const imaginiVrajitoare = ["../imagini/vrajitoare/v1.png", "../imagini/vrajitoare/v2.png", "../imagini/vrajitoare/v3.png"];
let frameVrajitoare = 0;

setInterval(() => {
    frameVrajitoare = (frameVrajitoare + 1) % imaginiVrajitoare.length;
    const vImg = document.getElementById('vrajitoare');
    if (vImg) vImg.src = imaginiVrajitoare[frameVrajitoare];
}, 150);

// --- START ---
seteazaIdlePersonaj();
spawnFantoma();
initializareRecunoastereVocala();
requestAnimationFrame(joc);