document.addEventListener("DOMContentLoaded", function() {
    fetchLeaderboard();
});

function fetchLeaderboard() {
    fetch('http://localhost:8080/api/users/NivScore')
        .then(response => {
            if (!response.ok) throw new Error("Eroare la preluarea datelor: " + response.status);
            return response.json();
        })
        .then(users => {
            const container = document.querySelector('.lista-scoruri');
            if (!container) return;

            container.innerHTML = "";
            users.sort((a, b) => b.scor - a.scor);

            const idimp = localStorage.getItem('userId');

            let randimp = null; 
            let nr = 1;

            users.forEach((user, index) => {
                const rand = document.createElement('div');
                rand.className = 'rand-scor';
             
                const esteEu = (user.id == idimp);

                rand.innerHTML = `
                    <span>${index + 1}. ${user.username || 'Anonim'}</span>
                    <span>Nivel ${user.nivel !== undefined ? user.nivel : 1}</span>
                    <span>${user.scor || 0} pct</span>
                `;

                if (esteEu) {
                    randimp = rand.cloneNode(true); 
                    randimp.classList.add('meu-loc-special');
                }

                if (nr <= 10) {
                    container.appendChild(rand);
                    nr++;
                }
            });

            if (randimp) {
                const separator = document.createElement('div');
                separator.className = 'separator-leaderboard';
                separator.innerHTML = "<span>Locul tău</span>";
                
                container.appendChild(separator);
                container.appendChild(randimp);
            }
        })
        .catch(error => {
            console.error("Eroare la fetch:", error);
            const container = document.querySelector('.lista-scoruri');
            if (container) {
                container.innerHTML = `<p style='text-align:center; color: #ff6b6b;'>Eroare: Nu s-a putut conecta la server.</p>`;
            }
        });
}