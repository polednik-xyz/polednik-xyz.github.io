// Main JavaScript file - initialize everything
import { CustomCursor } from './components/cursor.js';
import { MusicPlayer } from './components/music-player.js';
import { ThemeToggle } from './components/theme-toggle.js';
import { ModalManager } from './components/modal.js';
import { ScrollProgress } from './utils/scroll-progress.js';
import { SectionAnimator } from './utils/section-animator.js';
import { SmoothScroll } from './utils/smooth-scroll.js';

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme toggle first
    const themeToggle = new ThemeToggle();
    
    // Initialize custom cursor for desktop devices only
    let customCursor = null;
    if (window.matchMedia('(hover: hover)').matches) {
        customCursor = new CustomCursor();
        window.customCursor = customCursor;
    }
    
    // Initialize other components
    new MusicPlayer();
    new ModalManager();
    new ScrollProgress();
    new SectionAnimator();
    new SmoothScroll();
    
    // Page load animation
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
        
        if (customCursor) {
            setTimeout(() => customCursor.refresh(), 100);
        }
    });
    
    // Update header on scroll
    window.addEventListener('scroll', () => {
        themeToggle.updateHeaderColors();
    });
});