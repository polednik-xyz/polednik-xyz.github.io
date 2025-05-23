// Scroll reveal for sections
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Scroll progress bar
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
    
    // Header background change on scroll
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
        header.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
    }
});
