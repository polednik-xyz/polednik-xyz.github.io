// Scroll Progress Utility
export class ScrollProgress {
    constructor() {
        this.progressBar = document.querySelector('.scroll-progress');
        this.init();
    }
    
    init() {
        if (!this.progressBar) return;
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            this.progressBar.style.width = scrolled + '%';
        });
    }
}
