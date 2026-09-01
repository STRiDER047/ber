// --- التحكم بقائمة الجوال (Mobile Menu Toggle) ---
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

if (menuButton) {
    menuButton.addEventListener('click', toggleMenu);
}

mobileNavItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
        if (iconClose) iconClose.classList.add('hidden');
        if (iconBars) iconBars.classList.remove('hidden');
    });
});

// --- التحكم بالوضع الليلي (Dark/Light Mode) ---
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

updateThemeIcons();

if (themeToggleBtn) {
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
}

// --- التحكم بنافذة التبرع والتنبيه القانوني (Modal Logic) ---
const donateModal = document.getElementById('donate-modal');
const openModalButtons = document.querySelectorAll('.open-donate-modal');
const closeModalButton = document.getElementById('close-modal-button');
const cancelModalButton = document.getElementById('cancel-modal-button');

function openModal() {
    if (donateModal) {
        donateModal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }
}

function closeModal() {
    if (donateModal) {
        donateModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
}

openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

if (closeModalButton) closeModalButton.addEventListener('click', closeModal);
if (cancelModalButton) cancelModalButton.addEventListener('click', closeModal);

// إغلاق النافذة عند النقر خارج المحتوى (على الخلفية المعتمة)
if (donateModal) {
    donateModal.addEventListener('click', (e) => {
        if (e.target === donateModal) {
            closeModal();
        }
    });
}

// إغلاق النافذة بمفتاح Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && donateModal && !donateModal.classList.contains('hidden')) {
        closeModal();
    }
});
// --- منطق السلايدر التفاعلي (Carousel Logic) مع دعم RTL ---
const carousel = document.getElementById('causes-carousel');
const prevBtn = document.getElementById('prev-btn'); // السهم الأيمن (السابق في RTL)
const nextBtn = document.getElementById('next-btn'); // السهم الأيسر (التالي في RTL)

if (carousel && prevBtn && nextBtn) {
    
    // دالة لحساب مسافة التمرير (تمرير بمقدار كرت واحد تقريباً)
    const getScrollAmount = () => {
        const cardWidth = carousel.querySelector('.shrink-0').clientWidth;
        const gap = 24; // Tailwind gap-6 = 24px
        return cardWidth + gap;
    };

    // التمرير لليسار (التالي)
    nextBtn.addEventListener('click', () => {
        // في الـ RTL التمرير لليسار يعني قيمة سالبة
        carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    // التمرير لليمين (السابق)
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    // تحديث حالة الأسهم (تعطيل/تفعيل) بناءً على موقع التمرير
    const updateArrowStates = () => {
        // نستخدم Math.abs لأن بعض المتصفحات تعطي قيماً سالبة للتمرير في الـ RTL
        const currentScroll = Math.abs(carousel.scrollLeft);
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        // التحقق من الوصول للبداية (اليمين)
        if (currentScroll <= 5) {
            prevBtn.classList.add('opacity-40', 'cursor-not-allowed');
            prevBtn.classList.remove('hover:bg-amber-500', 'hover:text-white', 'dark:hover:text-slate-900');
        } else {
            prevBtn.classList.remove('opacity-40', 'cursor-not-allowed');
            prevBtn.classList.add('hover:bg-amber-500', 'hover:text-white', 'dark:hover:text-slate-900');
        }

        // التحقق من الوصول للنهاية (اليسار)
        if (currentScroll >= maxScroll - 5) {
            nextBtn.classList.add('opacity-40', 'cursor-not-allowed');
            nextBtn.classList.remove('hover:bg-amber-500', 'hover:text-white', 'dark:hover:text-slate-900');
        } else {
            nextBtn.classList.remove('opacity-40', 'cursor-not-allowed');
            nextBtn.classList.add('hover:bg-amber-500', 'hover:text-white', 'dark:hover:text-slate-900');
        }
    };

    // الاستماع لأحداث التمرير وتغيير حجم الشاشة
    carousel.addEventListener('scroll', updateArrowStates);
    window.addEventListener('resize', updateArrowStates);
    
    // تشغيل الدالة مبدئياً لضبط الحالة الافتراضية للأسهم
    updateArrowStates();
}