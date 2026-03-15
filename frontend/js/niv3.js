// Lista de date conectate
const dateJoc = [
    { infinitiv: "to go", pastSimple: "went", propozitie: "Yesterday, I .... to the park." },
    { infinitiv: "to eat", pastSimple: "ate", propozitie: "She .... a delicious apple this morning." },
    { infinitiv: "to read", pastSimple: "read", propozitie: "He .... that book last week." },
    { infinitiv: "to drink", pastSimple: "drank", propozitie: "They .... all the orange juice." },
    { infinitiv: "to see", pastSimple: "saw", propozitie: "I .... a shooting star last night." },
    { infinitiv: "to write", pastSimple: "wrote", propozitie: "The student .... a long essay." },
    { infinitiv: "to sleep", pastSimple: "slept", propozitie: "The cat .... all day long." },
    { infinitiv: "to run", pastSimple: "ran", propozitie: "We .... to catch the bus." }
];

let scor = 0;
let vieti = 3;
let rundaCurenta = {};

// Elemente DOM
const input = document.getElementById('raspuns-utilizator');
const bubble = document.getElementById('bubble-cuvant');
const textChenar = document.getElementById('propozitie-text');
const scorElement = document.getElementById('scor');

function nouaRunda() {
    if (dateJoc.length === 0) {
        terminaJocul(true);
        return;
    }

    rundaCurenta = dateJoc[Math.floor(Math.random() * dateJoc.length)];
    bubble.innerText = rundaCurenta.infinitiv;
    textChenar.innerText = rundaCurenta.propozitie;
    
    input.value = "";
    input.focus();
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        let raspuns = input.value.toLowerCase().trim();
        let corect = rundaCurenta.pastSimple.toLowerCase();

        if (raspuns === corect) {
            scor += 10;
            scorElement.innerText = "Scor: " + scor;
            document.getElementById('container-fantoma').style.filter = "drop-shadow(0 0 20px #4caf50)";
            setTimeout(() => {
                document.getElementById('container-fantoma').style.filter = "none";
            }, 500);
            nouaRunda();
        } else {
            pierdeViata();
        }
    }
});

function pierdeViata() {
    const inima = document.getElementById(`inima-${vieti}`);
    if (inima) {
        inima.style.filter = "grayscale(1) opacity(0.3)";
    }
    
    vieti--;

    if (vieti <= 0) {
        terminaJocul(false);
    } else {
        textChenar.style.color = "red";
        setTimeout(() => { textChenar.style.color = "white"; }, 500);
        nouaRunda();
    }
} // <--- Aici lipsea aceasta acolada!

function terminaJocul(aCastigat) {
    const ecranFinal = document.getElementById('ecran-final');
    if (ecranFinal) {
        ecranFinal.classList.remove('ascuns');
        document.getElementById('scor-final').innerText = "Scor final: " + scor;
        document.getElementById('titlu-final').innerText = aCastigat ? "Felicitări!" : "Ai pierdut!";
    }
}

// Pornire joc
nouaRunda();