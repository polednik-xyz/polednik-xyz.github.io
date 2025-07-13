// Modal Manager Component
export class ModalManager {
    constructor() {
        this.certificateBtn = document.getElementById('certificateBtn');
        this.certificateModal = document.getElementById('certificateModal');
        this.modalClose = document.getElementById('modalClose');
        this.shareBtn = document.getElementById('shareBtn');
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        this.init();
    }
    
    init() {
        if (!this.certificateBtn || !this.certificateModal || !this.modalClose || !this.shareBtn) {
            console.log('Modal elements not found');
            return;
        }
        
        this.bindEvents();
        console.log('Modal setup complete');
    }
    
    bindEvents() {
        // Modal open/close events
        this.certificateBtn.addEventListener('click', this.openModal.bind(this));
        this.certificateBtn.addEventListener('touchend', this.openModal.bind(this));
        
        this.modalClose.addEventListener('click', this.closeModal.bind(this));
        this.modalClose.addEventListener('touchend', this.closeModal.bind(this));
        
        // Click outside to close
        this.certificateModal.addEventListener('click', (e) => {
            if (e.target === this.certificateModal) {
                this.closeModal(e);
            }
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (this.certificateModal.classList.contains('active') && e.key === 'Escape') {
                this.closeModal(e);
            }
        });
        
        // Share functionality
        this.shareBtn.addEventListener('click', this.handleShare.bind(this));
        
        // Orientation and resize handlers
        window.addEventListener('orientationchange', this.handleOrientationChange.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    
    openModal(e) {
        if (e) e.preventDefault();
        console.log('Opening modal...');
        
        this.certificateModal.classList.add('active');
        this.preventBodyScroll(true);
        
        // Refresh custom cursor if exists
        if (window.customCursor && !this.isTouchDevice) {
            setTimeout(() => {
                window.customCursor.refresh();
            }, 100);
        }
        
        // Focus management
        setTimeout(() => {
            if (this.isTouchDevice) {
                const modalContent = this.certificateModal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.scrollTop = 0;
                }
            } else {
                this.modalClose.focus();
            }
        }, 300);
    }
    
    closeModal(e) {
        if (e) e.preventDefault();
        console.log('Closing modal...');
        
        this.certificateModal.classList.remove('active');
        this.preventBodyScroll(false);
        
        // Refresh custom cursor if exists
        if (window.customCursor && !this.isTouchDevice) {
            setTimeout(() => {
                window.customCursor.refresh();
            }, 100);
        }
        
        // Return focus only on desktop
        if (!this.isTouchDevice) {
            setTimeout(() => {
                this.certificateBtn.focus();
            }, 100);
        }
    }
    
    handleShare(e) {
        e.preventDefault();
        console.log('Share button clicked');
        
        const shareText = "🏆 Daniel Poledník - 39. místo z téměř 6000 účastníků na TryHackMe CTF 'Industrial Intrusion'! 🔒 #cybersecurity #CTF #TryHackMe";
        const shareUrl = window.location.href;
        const fullShareText = shareText + ' ' + shareUrl;
        
        // Try native share first (mobile)
        if (navigator.share && this.isTouchDevice) {
            navigator.share({
                title: 'TryHackMe CTF Úspěch',
                text: shareText,
                url: shareUrl
            }).catch(err => {
                console.log('Native share failed:', err);
                this.copyToClipboard(fullShareText);
            });
        } else {
            this.copyToClipboard(fullShareText);
        }
    }
    
    copyToClipboard(text) {
        console.log('Copying to clipboard:', text);
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                this.showSuccessMessage();
            }).catch(err => {
                console.log('Clipboard API failed:', err);
                this.fallbackCopy(text);
            });
        } else {
            this.fallbackCopy(text);
        }
    }
    
    fallbackCopy(text) {
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
                this.showSuccessMessage();
            } else {
                this.showErrorMessage();
            }
        } catch (err) {
            console.error('Fallback copy failed:', err);
            this.showErrorMessage();
        } finally {
            document.body.removeChild(textArea);
        }
    }
    
    showSuccessMessage() {
        const originalHTML = this.shareBtn.innerHTML;
        this.shareBtn.innerHTML = '<span>Zkopírováno!</span><div class="button-icon">✓</div>';
        this.shareBtn.classList.add('success');
        this.shareBtn.disabled = true;
        
        setTimeout(() => {
            this.shareBtn.innerHTML = originalHTML;
            this.shareBtn.classList.remove('success');
            this.shareBtn.disabled = false;
        }, 2000);
    }
    
    showErrorMessage() {
        const originalHTML = this.shareBtn.innerHTML;
        this.shareBtn.innerHTML = '<span>Chyba</span><div class="button-icon">⚠️</div>';
        
        setTimeout(() => {
            this.shareBtn.innerHTML = originalHTML;
        }, 2000);
    }
    
    preventBodyScroll(prevent) {
        if (prevent) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    handleOrientationChange() {
        if (this.certificateModal.classList.contains('active')) {
            setTimeout(() => {
                const modalContent = this.certificateModal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.scrollTop = 0;
                    // Force reflow for iOS
                    modalContent.style.minHeight = window.innerHeight + 'px';
                    requestAnimationFrame(() => {
                        modalContent.style.minHeight = '';
                    });
                }
            }, 500);
        }
    }
    
    handleResize() {
        if (this.certificateModal.classList.contains('active') && this.isTouchDevice) {
            const modalContent = this.certificateModal.querySelector('.modal-content');
            if (modalContent) {
                // Adjust height for iOS keyboard/toolbar changes
                requestAnimationFrame(() => {
                    modalContent.style.minHeight = window.innerHeight + 'px';
                });
            }
        }
    }
}
