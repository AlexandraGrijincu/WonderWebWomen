document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Nu lăsa pagina să se reîncarce

            // 1. Luăm valorile din input-uri
            // Verifică dacă în HTML ai <input type="email"> și <input type="password">
            const emailInput = document.querySelector('input[type="email"]').value;
            const passwordInput = document.querySelector('input[type="password"]').value;

            // 2. Construim obiectul (Cheile trebuie să fie identice cu LoginRequest.java)
            const payload = {
                email: emailInput,
                parola: passwordInput
            };

            console.log("Trimitem datele către server:", payload);

            try {
                // 3. Trimitem cererea către adresa Spring Boot
                const response = await fetch('http://localhost:8080/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json(); // Aici primim LoginResponse

                if (data.success) {
                    alert("Bravo! " + data.message);
                    window.location.href = "index.html"; // Mergem la login
                } else {
                    alert("Hopa: " + data.message);
                }
            } catch (error) {
                console.error("Eroare critică:", error);
                alert("Nu pot contacta serverul. Este pornit pe portul 8080?");
            }
        });
    }
});