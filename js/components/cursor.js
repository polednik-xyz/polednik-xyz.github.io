// Custom Cursor Component
export class CustomCursor {
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
        
        this.updateHoverElements();
        this.bindEvents();
        this.animateOuterCursor();
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.isMoving = true;
            
            if (this.isVisible) {
                this.cursorInner.style.left = this.mouseX + 'px';
                this.cursorInner.style.top = this.mouseY + 'px';
            }
        });
        
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
        this.cursor.classList.remove('cursor-hover');
        
        const hoverElements = document.querySelectorAll(`
            a, button, input[type="range"], 
            .nav-links a, .cta-button, .contact-button, .logo,
            .certificate-button, .modal-close, .action-button, 
            .stat-item, .team-badge, .play-btn, .info-icon,
            .volume-icon, .progress-bar, .theme-toggle
        `);
        
        hoverElements.forEach(element => {
            element.removeEventListener('mouseenter', this.handleMouseEnter);
            element.removeEventListener('mouseleave', this.handleMouseLeave);
            
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
    
    refresh() {
        this.updateHoverElements();
    }
    
    hide() {
        this.cursor.style.opacity = '0';
        this.isVisible = false;
    }
    
    show() {
        this.cursor.style.opacity = '1';
        this.isVisible = true;
    }
}
