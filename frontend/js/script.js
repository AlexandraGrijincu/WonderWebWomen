document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const emailInput = document.querySelector('input[type="email"]').value;
            const passwordInput = document.querySelector('input[type="password"]').value;

            const payload = {
                email: emailInput,
                parola: passwordInput
            };

            const isLoginPage = document.title.toLowerCase().includes("log in") || 
                               form.querySelector('button').innerText.toLowerCase().includes("log in");
            
            const endpoint = isLoginPage ? 'http://localhost:8080/api/login' : 'http://localhost:8080/api/register';

            try {
                // Trimitem datele în fundal (fără să blocăm utilizatorul cu alerte)
                await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                // Te trimite DIRECT la home, fără niciun mesaj
                window.location.href = "home.html"; 

            } catch (error) {
                console.error("Eroare server:", error);
                // Chiar dacă serverul e oprit, te trimitem la home (pentru testare)
                window.location.href = "home.html"; 
            }
        });
    }
});