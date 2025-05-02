import { mobileMenuButton, mobileMenu } from './mobile-menu.js';
import { initSmoothScroll, initHeaderScroll } from './scroll.js';

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    // Initialize features
    initThemeSwitcher();
    initSmoothScroll();
    initHeaderScroll();

    // Burger menu logic
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Chiudi il menu quando si clicca su un link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});

// Theme Switcher
const initThemeSwitcher = () => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const html = document.documentElement;
    
    // Imposta tema iniziale
    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    // Controlla se esiste una preferenza salvata
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
    }

    // Gestisce il click sui pulsanti
    const toggleTheme = () => {
        const currentTheme = html.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    };

    // Aggiungi event listener ai pulsanti
    document.querySelectorAll('#theme-toggle, #theme-toggle-mobile').forEach(button => {
        button.addEventListener('click', toggleTheme);
    });

    // Ascolta cambiamenti del tema di sistema
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
};
