// Custom Cursor - Optimized
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.cursorInner = document.querySelector('.cursor-inner');
        this.cursorOuter = document.querySelector('.cursor-outer');
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.outerX = 0;
        this.outerY = 0;
        this.isMoving = false;
        this.isVisible = true;
        
        this.init();
    }
    
    init() {
        if (!this.cursor) return;
        
        // Initial setup
        this.updateHoverElements();
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.isMoving = true;
            
            if (this.isVisible) {
                this.cursorInner.style.left = this.mouseX + 'px';
                this.cursorInner.style.top = this.mouseY + 'px';
            }
        });
        
        this.animateOuterCursor();
        
        document.addEventListener('mousedown', () => {
            if (this.isVisible) {
                this.cursor.classList.add('cursor-click');
            }
        });
        
        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('cursor-click');
        });
        
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
            this.isVisible = false;
        });
        
        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
            this.isVisible = true;
        });
    }
    
    updateHoverElements() {
        // Remove old event listeners by cloning elements (if needed)
        this.cursor.classList.remove('cursor-hover');
        
        // Get all interactive elements including modal elements
        const hoverElements = document.querySelectorAll(`
            a, button, input[type="range"], 
            .nav-links a, .cta-button, .contact-button, .logo,
            .certificate-button, .modal-close, .action-button, 
            .stat-item, .team-badge, .play-btn, .info-icon,
            .volume-icon, .progress-bar, .theme-toggle
        `);
        
        hoverElements.forEach(element => {
            // Remove existing listeners to prevent duplicates
            element.removeEventListener('mouseenter', this.handleMouseEnter);
            element.removeEventListener('mouseleave', this.handleMouseLeave);
            
            // Add new listeners
            element.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
            element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        });
    }
    
    handleMouseEnter() {
        if (this.isVisible) {
            this.cursor.classList.add('cursor-hover');
        }
    }
    
    handleMouseLeave() {
        this.cursor.classList.remove('cursor-hover');
    }
    
    animateOuterCursor() {
        if (this.isMoving && this.isVisible) {
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
    
    // Method to refresh hover elements (called after modal opens/closes)
    refresh() {
        this.updateHoverElements();
    }
    
    // Method to hide cursor temporarily
    hide() {
        this.cursor.style.opacity = '0';
        this.isVisible = false;
    }
    
    // Method to show cursor
    show() {
        this.cursor.style.opacity = '1';
        this.isVisible = true;
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
    
    // Initialize custom cursor for desktop devices only
    let customCursor = null;
    if (window.matchMedia('(hover: hover)').matches) {
        customCursor = new CustomCursor();
        
        // Make cursor available globally for modal updates
        window.customCursor = customCursor;
    }
    
    new MusicPlayer();
    new ScrollProgress();
    new SectionAnimator();
    new SmoothScroll();
    
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
        
        // Refresh cursor after page load
        if (customCursor) {
            setTimeout(() => customCursor.refresh(), 100);
        }
    });
    
    // Update header scroll handler to work with theme toggle
    window.addEventListener('scroll', () => {
        themeToggle.updateHeaderColors();
    });
});

// Certificate Modal Functionality - SIMPLIFIED AND FIXED
document.addEventListener('DOMContentLoaded', function() {
    const certificateBtn = document.getElementById('certificateBtn');
    const certificateModal = document.getElementById('certificateModal');
    const modalClose = document.getElementById('modalClose');
    const shareBtn = document.getElementById('shareBtn');

    // Early exit if elements don't exist
    if (!certificateBtn || !certificateModal || !modalClose || !shareBtn) {
        console.log('Modal elements not found');
        return;
    }

    console.log('Modal elements found, setting up...');

    // Detect touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Simple scroll prevention
    function preventBodyScroll(prevent) {
        if (prevent) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    // Open modal function
    function openModal(e) {
        if (e) e.preventDefault();
        console.log('Opening modal...');
        
        certificateModal.classList.add('active');
        preventBodyScroll(true);
        
        // NEBUDEME skrývat cursor - chceme ho vidět nad modalem
        // Pouze refreshneme hover elementy
        if (window.customCursor && !isTouchDevice) {
            setTimeout(() => {
                window.customCursor.refresh();
            }, 100);
        }
        
        // Focus management pro mobilní zařízení
        setTimeout(() => {
            if (isTouchDevice) {
                // Na mobilu nefocusuj close button - může způsobit problémy s klávesnicí
                const modalContent = certificateModal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.scrollTop = 0;
                }
            } else {
                modalClose.focus();
            }
        }, 300);
    }

    // Close modal function
    function closeModal(e) {
        if (e) e.preventDefault();
        console.log('Closing modal...');
        
        certificateModal.classList.remove('active');
        preventBodyScroll(false);
        
        // Pouze refreshneme cursor po zavření
        if (window.customCursor && !isTouchDevice) {
            setTimeout(() => {
                window.customCursor.refresh();
            }, 100);
        }
        
        // Return focus to trigger button pouze na desktopu
        if (!isTouchDevice) {
            setTimeout(() => {
                certificateBtn.focus();
            }, 100);
        }
    }

    // Event listeners - SIMPLIFIED
    certificateBtn.addEventListener('click', openModal);
    certificateBtn.addEventListener('touchend', openModal);
    
    modalClose.addEventListener('click', closeModal);
    modalClose.addEventListener('touchend', closeModal);

    // Click/touch outside to close
    certificateModal.addEventListener('click', function(e) {
        if (e.target === certificateModal) {
            closeModal(e);
        }
    });

    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (certificateModal.classList.contains('active') && e.key === 'Escape') {
            closeModal(e);
        }
    });

    // Share functionality - SIMPLIFIED
    shareBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Share button clicked');
        
        const shareText = "🏆 Daniel Poledník - 39. místo z téměř 6000 účastníků na TryHackMe CTF 'Industrial Intrusion'! 🔒 #cybersecurity #CTF #TryHackMe";
        const shareUrl = window.location.href;
        const fullShareText = shareText + ' ' + shareUrl;
        
        // Try native share first (mobile)
        if (navigator.share && isTouchDevice) {
            navigator.share({
                title: 'TryHackMe CTF Úspěch',
                text: shareText,
                url: shareUrl
            }).catch(err => {
                console.log('Native share failed:', err);
                copyToClipboard(fullShareText);
            });
        } else {
            copyToClipboard(fullShareText);
        }
    });

    // Clipboard functionality
    function copyToClipboard(text) {
        console.log('Copying to clipboard:', text);
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(function() {
                showSuccessMessage();
            }).catch(function(err) {
                console.log('Clipboard API failed:', err);
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    }

    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showSuccessMessage();
            } else {
                showErrorMessage();
            }
        } catch (err) {
            console.error('Fallback copy failed:', err);
            showErrorMessage();
        } finally {
            document.body.removeChild(textArea);
        }
    }

    function showSuccessMessage() {
        const originalHTML = shareBtn.innerHTML;
        shareBtn.innerHTML = '<span>Zkopírováno!</span><div class="button-icon">✓</div>';
        shareBtn.classList.add('success');
        shareBtn.disabled = true;
        
        setTimeout(() => {
            shareBtn.innerHTML = originalHTML;
            shareBtn.classList.remove('success');
            shareBtn.disabled = false;
        }, 2000);
    }

    function showErrorMessage() {
        const originalHTML = shareBtn.innerHTML;
        shareBtn.innerHTML = '<span>Chyba</span><div class="button-icon">⚠️</div>';
        
        setTimeout(() => {
            shareBtn.innerHTML = originalHTML;
        }, 2000);
    }

    // Handle orientation changes - VYLEPŠENO PRO iOS
    window.addEventListener('orientationchange', function() {
        if (certificateModal.classList.contains('active')) {
            // Počkej na dokončení změny orientace
            setTimeout(() => {
                const modalContent = certificateModal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.scrollTop = 0;
                    // Force reflow pro iOS
                    modalContent.style.minHeight = window.innerHeight + 'px';
                    requestAnimationFrame(() => {
                        modalContent.style.minHeight = '';
                    });
                }
            }, 500);
        }
    });

    // Přidám handling pro iOS viewport changes
    window.addEventListener('resize', function() {
        if (certificateModal.classList.contains('active') && isTouchDevice) {
            const modalContent = certificateModal.querySelector('.modal-content');
            if (modalContent) {
                // Adjust height pro iOS keyboard/toolbar changes
                requestAnimationFrame(() => {
                    modalContent.style.minHeight = window.innerHeight + 'px';
                });
            }
        }
    });

    console.log('Modal setup complete');
});
