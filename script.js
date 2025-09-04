// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.step, .segment-card, .about-point');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Show a simple modal or redirect (you can customize this)
            showChatModal();
        });
    });

    // Chat bubble typing animation
    const typingDots = document.querySelectorAll('.chat-typing span');
    typingDots.forEach((dot, index) => {
        dot.style.animationDelay = `${index * 0.2}s`;
    });

    // Stats counter animation
    const statsNumbers = document.querySelectorAll('.stats-card h3');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Simple chat modal
function showChatModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'chat-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Start Your Chat</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <p>Ready to unwobble? You'll be connected with a real human listener in just a few minutes.</p>
                <div class="chat-option">
                    <i class="fas fa-comments"></i>
                    <span>Text Chat (15 min)</span>
                    <small>Quick, private, and perfect for when you need to get things off your chest</small>
                </div>
                <button class="btn-primary btn-large" style="width: 100%; margin-top: 20px;">
                    <i class="fas fa-rocket"></i>
                    Start Your Chat
                </button>
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .chat-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 0;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow: hidden;
            animation: slideUp 0.3s ease;
        }
        
        .modal-header {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            padding: 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h3 {
            margin: 0;
            font-size: 1.5rem;
        }
        
        .close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .close-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .modal-body {
            padding: 30px;
        }
        
        .chat-option {
            padding: 20px;
            border: 2px solid #e2e8f0;
            border-radius: 15px;
            background: #f8fafc;
            margin: 20px 0;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }
        
        .chat-option i {
            font-size: 1.5rem;
            color: #6366f1;
        }
        
        .chat-option span {
            font-weight: 600;
            color: #1e293b;
            font-size: 1.1rem;
        }
        
        .chat-option small {
            color: #64748b;
            line-height: 1.4;
            margin: 0;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                margin: 20px;
            }
        }
    `;

    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });



    // Connect button
    const connectBtn = modal.querySelector('.btn-primary');
    connectBtn.addEventListener('click', () => {
        // Here you would typically redirect to your chat service
        // For now, we'll show a success message
        modal.querySelector('.modal-body').innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: #10b981; margin-bottom: 20px;"></i>
                <h3>Connecting you now...</h3>
                <p>You'll be matched with a listener in just a moment. Hang tight!</p>
            </div>
        `;
        
        setTimeout(() => {
            modal.remove();
        }, 3000);
    });
}

// Add some hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to segment cards
    const segmentCards = document.querySelectorAll('.segment-card');
    segmentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add hover effects to steps
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Sticky mailing list functionality
    const stickyMailing = document.querySelector('.sticky-mailing');
    
    // Show sticky mailing after scrolling down a bit
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            stickyMailing.classList.add('show');
        } else {
            stickyMailing.classList.remove('show');
        }
    });
    
    // Handle form submission
    const stickyForm = document.querySelector('.sticky-form');
    if (stickyForm) {
        stickyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thanks! We\'ll send your discount code to ' + email);
                this.reset();
            }
        });
    }
});

// Close sticky mailing list function
function closeStickyMailing() {
    const stickyMailing = document.querySelector('.sticky-mailing');
    if (stickyMailing) {
        stickyMailing.style.transform = 'translateY(100%)';
        stickyMailing.classList.add('hidden');
    }
}

// Fix validation message positioning
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.querySelector('.sticky-form input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('invalid', function(e) {
            // Force validation message to appear above on mobile
            if (window.innerWidth <= 768) {
                this.style.setProperty('--validation-position', 'above');
            }
        });
    }
});
