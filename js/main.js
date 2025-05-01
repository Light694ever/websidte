import { mobileMenuButton, mobileMenu } from './mobile-menu.js';
import { initSmoothScroll, initHeaderScroll } from './scroll.js';

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initHeaderScroll();
});
