console.log("Scriptul login.js a fost încărcat!"); // Verificăm dacă fișierul e legat la HTML

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM-ul este gata!"); 

    const loginForm = document.querySelector('form');
    
    if (!loginForm) {
        console.error("EROARE: Nu am găsit niciun element <form> în pagină!");
        return;
    }

    console.log("Formularul a fost găsit cu succes.");

    loginForm.addEventListener('submit', async (e) => {
        console.log("Butonul a fost apăsat, încercăm trimiterea...");
        e.preventDefault(); // Oprim reîncărcarea paginii

        const emailInput = document.querySelector('input[type="email"]');
        const passwordInput = document.querySelector('input[type="password"]');

        if (!emailInput || !passwordInput) {
            console.error("EROARE: Nu am găsit câmpurile de email sau parolă!");
            return;
        }

        const payload = {
            email: emailInput.value.trim(),
            parola: passwordInput.value.trim()
        };

        console.log("Datele pregătite pentru trimitere:", payload);

        try {
            console.log("Apelez serverul: http://localhost:8080/api/login ...");
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            console.log("Serverul a răspuns! Status:", response.status);
            
            const data = await response.json();
            console.log("Date primite de la server (JSON):", data);

            if (response.ok) {
                console.log("Succes! Salvăm în localStorage și plecăm la pag.html");
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('userProgress', data.nivel);
                window.location.href = "pag.html";
            } else {
                console.warn("Serverul a refuzat login-ul:", data.message);
                alert("Eroare: " + data.message);
            }

        } catch (error) {
            console.error("CRITICAL: Eroare de rețea sau serverul e oprit!", error);
            alert("Nu mă pot conecta la server!");
        }
    });
});