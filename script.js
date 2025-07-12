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

// Simple Theme Toggle
class ThemeToggle {
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme toggle first
    const themeToggle = new ThemeToggle();
    
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
    
    // Update header scroll handler to work with theme toggle
    window.addEventListener('scroll', () => {
        themeToggle.updateHeaderColors();
    });
});

// Certificate Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const certificateBtn = document.getElementById('certificateBtn');
    const certificateModal = document.getElementById('certificateModal');
    const modalClose = document.getElementById('modalClose');
    const shareBtn = document.getElementById('shareBtn');

    // Check if elements exist before adding event listeners
    if (!certificateBtn || !certificateModal || !modalClose || !shareBtn) return;

    // Open modal
    certificateBtn.addEventListener('click', function() {
        certificateModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add to custom cursor hover elements
        const customCursor = document.querySelector('.custom-cursor');
        if (customCursor) {
            customCursor.classList.add('cursor-hover');
        }
    });

    // Close modal
    function closeModal() {
        certificateModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Remove from custom cursor hover elements
        const customCursor = document.querySelector('.custom-cursor');
        if (customCursor) {
            customCursor.classList.remove('cursor-hover');
        }
    }

    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside
    certificateModal.addEventListener('click', function(e) {
        if (e.target === certificateModal) {
            closeModal();   
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && certificateModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Share functionality with better error handling
    shareBtn.addEventListener('click', function() {
        const shareText = "🏆 Daniel Poledník - 39. místo z téměř 6000 účastníků na TryHackMe CTF 'Industrial Intrusion'! 🔒 #cybersecurity #CTF #TryHackMe";
        
        if (navigator.share) {
            navigator.share({
                title: 'TryHackMe CTF Úspěch',
                text: shareText,
                url: window.location.href
            }).catch(err => {
                console.log('Share failed:', err);
                // Fallback to clipboard
                copyToClipboard(shareText);
            });
        } else {
            copyToClipboard(shareText);
        }
    });

    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text + ' ' + window.location.href).then(function() {
                showSuccessMessage();
            }).catch(function() {
                // Fallback for older browsers
                fallbackCopyToClipboard(text + ' ' + window.location.href);
            });
        } else {
            fallbackCopyToClipboard(text + ' ' + window.location.href);
        }
    }

    function fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showSuccessMessage();
    }

    function showSuccessMessage() {
        shareBtn.innerHTML = '<span>Zkopírováno!</span><div class="button-icon">✓</div>';
        shareBtn.classList.add('success');
        setTimeout(() => {
            shareBtn.innerHTML = '<span>Sdílet úspěch</span><div class="button-icon">📋</div>';
            shareBtn.classList.remove('success');
        }, 2000);
    }
});
