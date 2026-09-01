// --- Mobile Menu Toggle ---
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const iconBars = document.getElementById('menu-icon-bars');
const iconClose = document.getElementById('menu-icon-close');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

function toggleMenu() {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuButton.setAttribute('aria-expanded', 'true');
        iconBars.classList.add('hidden');
        iconClose.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
        menuButton.setAttribute('aria-expanded', 'false');
        iconClose.classList.add('hidden');
        iconBars.classList.remove('hidden');
    }
}

menuButton.addEventListener('click', toggleMenu);

mobileNavItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuButton.setAttribute('aria-expanded', 'false');
        iconClose.classList.add('hidden');
        iconBars.classList.remove('hidden');
    });
});

// --- Dark/Light Mode Switcher Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('theme-moon');
const sunIcon = document.getElementById('theme-sun');

function updateThemeIcons() {
    if (document.documentElement.classList.contains('dark')) {
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

// Initialize icons on page load
updateThemeIcons();

themeToggleBtn.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    updateThemeIcons();
});