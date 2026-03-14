document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.querySelector('input[type="email"]').value;
            const password = document.querySelector('input[type="password"]').value;

            const payload = {
                email: email,
                parola: password
            };

            try {
                const response = await fetch('http://localhost:8080/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                // AICI ESTE SCHIMBAREA CRUCIALĂ:
                if (response.ok) {
                    // Serverul a returnat un status de succes (200 OK)
                    const data = await response.json(); 

                    // 2. Acum poți folosi data.userIds
                    localStorage.setItem('userId', data.userId);
                    
                    window.location.href = "pag.html";
                } else {
                    // Serverul a returnat o eroare (ex: 401 Unauthorized)
                    // Înseamnă că parola e greșită sau userul nu există
                    const errorData = await response.json();
                    alert("Eroare: " + (errorData.message || "Email sau parolă greșită!"));
                    
                    // NU punem window.location aici, deci utilizatorul rămâne pe pagina de login
                }

            } catch (error) {
                console.error("Eroare de conexiune:", error);
                alert("Serverul nu este pornit sau există o eroare de rețea.");
            }
        });
    }
});