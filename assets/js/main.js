// Toggle do menu mobile
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
        nav.classList.toggle("is-open");
    });

    // Fecha o menu ao clicar num link
    nav.addEventListener("click", (event) => {
        if (event.target.tagName === "A") {
            nav.classList.remove("is-open");
        }
    });
}

// Ano automático no footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Formulário “fake” só para feedback visual
function handleFormSubmit(event) {
    event.preventDefault();

    alert(
        "Este formulário é apenas demonstrativo no GitHub Pages.\n" +
        "Usa o WhatsApp, Instagram ou e-mail indicados no site para combinar a encomenda."
    );

    event.target.reset();
    return false;
}
