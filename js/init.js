// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Language Switcher
    const langButtons = document.querySelectorAll('#lang-toggle, #lang-toggle-mobile');
    const html = document.documentElement;

    function updateContent(lang) {
        html.setAttribute('lang', lang);
        localStorage.setItem('lang', lang);

        // Aggiorna i testi
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (window.translations?.[lang]?.[key]) {
                if (element.tagName.toLowerCase() === 'option') {
                    element.text = window.translations[lang][key];
                } else {
                    element.textContent = window.translations[lang][key];
                }
            }
        });

        // Aggiorna i placeholder
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (window.translations?.[lang]?.[key]) {
                element.placeholder = window.translations[lang][key];
            }
        });

        // Aggiorna le icone delle bandiere
        document.querySelectorAll('.lang-icon').forEach(icon => {
            icon.style.opacity = icon.dataset.lang === lang ? '1' : '0.5';
        });
    }

    // Imposta la lingua iniziale
    const savedLang = localStorage.getItem('lang') || 'it';
    updateContent(savedLang);

    // Gestione click sui pulsanti lingua
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentLang = html.getAttribute('lang');
            const newLang = currentLang === 'it' ? 'en' : 'it';
            updateContent(newLang);
        });
    });

    // Theme Switcher
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    themeToggles.forEach(button => {
        button.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    });

    // Mobile menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }
});