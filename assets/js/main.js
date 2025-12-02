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
            mensagem: contactForm.mensagem.value.trim()
        };

        // Validação básica extra
        if (!formData.nome || !formData.email || !formData.mensagem) {
            showStatus("Por favor preencha todos os campos.", "error");
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
