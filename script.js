// Custom Cursor - Optimized
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.cursorInner = document.querySelector('.cursor-inner');
        this.cursorOuter = document.querySelector('.cursor-outer');
        this.hoverElements = document.querySelectorAll('a, button, input[type="range"], .nav-links a, .cta-button, .contact-button, .logo');
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.outerX = 0;
        this.outerY = 0;
        this.isMoving = false;
        
        this.init();
    }
    
    init() {
        if (!this.cursor) return;
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.isMoving = true;
            
            this.cursorInner.style.left = this.mouseX + 'px';
            this.cursorInner.style.top = this.mouseY + 'px';
        });
        
        this.animateOuterCursor();
        
        this.hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
            });
        });
        
        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('cursor-click');
        });
        
        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('cursor-click');
        });
        
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        });
    }
    
    animateOuterCursor() {
        if (this.isMoving) {
            const lerp = 0.15;
            this.outerX += (this.mouseX - this.outerX) * lerp;
            this.outerY += (this.mouseY - this.outerY) * lerp;
            
            this.cursorOuter.style.left = this.outerX + 'px';
            this.cursorOuter.style.top = this.outerY + 'px';
            
            if (Math.abs(this.mouseX - this.outerX) < 0.5 && Math.abs(this.mouseY - this.outerY) < 0.5) {
                this.isMoving = false;
            }
        }
        
        requestAnimationFrame(() => this.animateOuterCursor());
    }
}

// Music Player
class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('audioPlayer');
        this.playBtn = document.getElementById('playBtn');
        this.progressFill = document.querySelector('.progress-fill');
        this.progressBar = document.querySelector('.progress-bar');
        this.volumeSlider = document.querySelector('.volume-slider');
        this.isPlaying = false;
        
        this.init();
    }
    
    init() {
        if (!this.audio) return;
        
        this.playBtn.addEventListener('click', () => {
            this.togglePlay();
        });
        
        this.progressBar.addEventListener('click', (e) => {
            const rect = this.progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const percentage = clickX / width;
            
            this.audio.currentTime = this.audio.duration * percentage;
        });
        
        this.volumeSlider.addEventListener('input', (e) => {
            this.audio.volume = e.target.value / 100;
        });
        
        this.audio.addEventListener('timeupdate', () => {
            this.updateProgress();
        });
        
        this.audio.volume = 0.1;
        this.volumeSlider.value = 10;
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
            this.playBtn.textContent = '▶';
            this.playBtn.classList.remove('playing');
        } else {
            this.audio.play().catch(e => {
                console.log('Playback prevented:', e);
            });
            this.playBtn.textContent = '⏸';
            this.playBtn.classList.add('playing');
        }
        this.isPlaying = !this.isPlaying;
    }
    
    updateProgress() {
        if (this.audio.duration) {
            const percentage = (this.audio.currentTime / this.audio.duration) * 100;
            this.progressFill.style.width = percentage + '%';
        }
    }
}

// Scroll Progress
class ScrollProgress {
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

// Section Animation Observer
class SectionAnimator {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(hover: hover)').matches) {
        new CustomCursor();
    }
    
    new MusicPlayer();
    new ScrollProgress();
    new SectionAnimator();
    new SmoothScroll();
    
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
        header.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
    }
});
