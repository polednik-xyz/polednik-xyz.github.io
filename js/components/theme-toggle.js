// Theme Toggle Component
export class ThemeToggle {
    constructor() {
        this.toggleBtn = document.getElementById('themeToggle');
        this.themeIcon = document.querySelector('.theme-icon');
        this.body = document.body;
        this.header = document.querySelector('header');
        
        // Load saved theme or default to dark
        this.currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
        this.init();
    }
    
    init() {
        if (!this.toggleBtn) return;
        
        // Apply saved theme
        this.applyTheme(this.currentTheme);
        
        // Add click listener
        this.toggleBtn.addEventListener('click', () => {
            this.toggle();
        });
        
        // Listen for system theme changes if no saved preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('portfolio-theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    toggle() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('portfolio-theme', this.currentTheme);
    }
    
    applyTheme(theme) {
        this.currentTheme = theme;
        
        if (theme === 'light') {
            this.body.classList.add('light-theme');
            this.themeIcon.textContent = '☀️';
        } else {
            this.body.classList.remove('light-theme');
            this.themeIcon.textContent = '🌙';
        }
        
        // Update meta theme color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'light' ? '#ffffff' : '#000000');
        }
        
        // Immediately update header colors
        this.updateHeaderColors();
    }
    
    updateHeaderColors() {
        if (!this.header) return;
        
        // Clear any inline styles to let CSS variables take over
        this.header.style.background = '';
        this.header.style.borderBottomColor = '';
        
        // Force immediate update based on scroll position
        const isScrolled = window.scrollY > 100;
        const isLight = this.body.classList.contains('light-theme');
        
        if (isScrolled) {
            this.header.style.background = isLight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(0, 0, 0, 0.98)';
            this.header.style.borderBottomColor = isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';
        } else {
            this.header.style.background = isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)';
            this.header.style.borderBottomColor = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
        }
    }
}
