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

const FORM_ENDPOINT = "https://bolos-functions-app-aha5afdehvatc2b9.spaincentral-01.azurewebsites.net/api/contact";

const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("contact-submit");
const statusEl = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Dados do formulário
        const formData = {
            nome: contactForm.nome.value.trim(),
            email: contactForm.email.value.trim(),
            telefone: contactForm.telefone.value.trim(),
            data: contactForm.data.value.trim(),
            mensagem: contactForm.mensagem.value.trim()
        };

        // Validação básica extra
        if (!formData.nome || !formData.telefone || !formData.mensagem) {
            showStatus("Por favor preencha nome, telemóvel e mensagem.", "error");
            return;
        }

        if (formData.email && !isValidEmail(formData.email)) {
            showStatus("O e-mail introduzido não é válido.", "error");
            return;
        }

        // Estado "a enviar"
        setSendingState(true);
        showStatus("A enviar mensagem...", null);

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                    // Se usar function key em header:
                    // "x-functions-key": "A_TUA_KEY_AQUI"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showStatus("Mensagem enviada com sucesso. Obrigado!", "ok");
                contactForm.reset();
            } else {
                showStatus(
                    "Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.",
                    "error"
                );
            }
        } catch (err) {
            console.error(err);
            showStatus(
                "Não foi possível contactar o servidor. Verifique a ligação e tente de novo.",
                "error"
            );
        } finally {
            setSendingState(false);
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message || "";
    statusEl.classList.remove("ok", "error");
    if (type) statusEl.classList.add(type);
}

function setSendingState(isSending) {
    if (!submitBtn) return;
    submitBtn.disabled = isSending;
    submitBtn.textContent = isSending ? "A enviar..." : "Enviar";
}

// Botões "Encomendar bolo como este"
const orderButtons = document.querySelectorAll(".order-cake-btn");

orderButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const form = document.getElementById("contact-form");
        const messageField = document.getElementById("mensagem");

        if (!form || !messageField) {
            console.warn("Formulário de contacto não encontrado.");
            return;
        }

        const template =
            btn.dataset.cakeMessage ||
            `Gostaria de encomendar um bolo como o "${btn.dataset.cakeName || "bolo do portfólio"}".`;

        messageField.value = template;

        // scroll suave até ao formulário
        form.scrollIntoView({ behavior: "smooth", block: "start" });

        // pequeno delay para o scroll terminar antes de focar
        setTimeout(() => {
            messageField.focus();

            if (!contactForm.nome.value || !contactForm.telefone.value) {
                submitBtn.click();
            }
        }, 600);
    });
});
