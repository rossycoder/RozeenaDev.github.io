// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate the hamburger menu
            navToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const smoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    };
    
    // Add smooth scrolling to all navigation links
    const navItems = document.querySelectorAll('.navbar-link, .footer a[href^="#"]');
    navItems.forEach(item => {
        item.addEventListener('click', smoothScroll);
    });
    
    // Apply animation to hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            button.style.transition = 'all 0.5s ease';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 1000 + (index * 200));
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }

                // Show success message
                const formSection = contactForm.parentNode;
                
                // Create and add the success message element
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                  <div class="success-icon">✓</div>
                  <div class="success-text">
                    <h3>Message Sent!</h3>
                    <p>Thank you ${name}, I will get back to you soon.</p>
                  </div>
                `;
                
                // Style the success message
                successMessage.style.display = 'flex';
                successMessage.style.alignItems = 'center';
                successMessage.style.justifyContent = 'center';
                successMessage.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                successMessage.style.border = '1px solid #10b981';
                successMessage.style.borderRadius = 'var(--radius)';
                successMessage.style.padding = '1rem';
                successMessage.style.marginTop = '1rem';
                successMessage.style.animation = 'fadeIn 0.5s ease-out';
                
                const successIcon = successMessage.querySelector('.success-icon');
                successIcon.style.backgroundColor = '#10b981';
                successIcon.style.color = 'white';
                successIcon.style.width = '40px';
                successIcon.style.height = '40px';
                successIcon.style.borderRadius = '50%';
                successIcon.style.display = 'flex';
                successIcon.style.alignItems = 'center';
                successIcon.style.justifyContent = 'center';
                successIcon.style.marginRight = '1rem';
                successIcon.style.fontSize = '1.5rem';
                
                // Add animation keyframes
                const style = document.createElement('style');
                style.innerHTML = `
                  @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                  @keyframes fadeOut {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(10px); }
                  }
                `;
                document.head.appendChild(style);
                
                // Append the success message to the form's parent element
                formSection.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.animation = 'fadeOut 0.5s ease-out forwards';
                    setTimeout(() => {
                        if(formSection.contains(successMessage)){
                           formSection.removeChild(successMessage);
                        }
                    }, 500);
                }, 5000);

            } catch (err) {
                console.error(err);
                // You can create a custom error message here as well
                alert('Oops! Something went wrong. Please try again.');
            }
        });
    }
    
    // Initialize skill level animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.querySelector('.skill-level');
                if (skillLevel) {
                    const width = skillLevel.getAttribute('data-level');
                    skillLevel.style.width = '0';
                    setTimeout(() => {
                        skillLevel.style.width = width;
                    }, 100);
                }
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const skillLevel = item.querySelector('.skill-level');
        if(skillLevel) {
            // Store the target width in a data attribute
            skillLevel.setAttribute('data-level', skillLevel.style.width);
            skillLevel.style.width = '0'; // Start at 0
        }
        skillObserver.observe(item);
    });
    
    // Animate timeline items
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `all 0.5s ease ${index * 0.2}s`;
        timelineObserver.observe(item);
    });
    
    // Animate project cards
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                projectObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        projectObserver.observe(card);
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
            navbar.style.padding = '0.75rem 1rem';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.85)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '1.25rem 1rem';
        }
    });
    
    // 3D Computer animation interaction
    const computer = document.querySelector('.computer');
    if (computer) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            computer.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg) translateY(-15px)`;
        });
    }
    
    // Typing effect for code animation
    const codeElement = document.querySelector('.code-animation pre code');
    if (codeElement) {
        const text = codeElement.innerHTML; // Use innerHTML to preserve syntax highlighting if any
        codeElement.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                codeElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Reset and repeat typing animation
                setTimeout(() => {
                    codeElement.innerHTML = '';
                    i = 0;
                    typeWriter();
                }, 3000);
            }
        };
        
        setTimeout(typeWriter, 2500);  // Start typing after loading screen disappears
    }
});

// Loading Screen and Initial Animations
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 500);
        }
        
        // Animate hero section elements
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroDescription = document.querySelector('.hero-description');
        
        if (heroTitle) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(20px)';
            setTimeout(() => {
                heroTitle.style.transition = 'all 0.5s ease';
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 500);
        }
        
        if (heroSubtitle) {
            heroSubtitle.style.opacity = '0';
            heroSubtitle.style.transform = 'translateY(20px)';
            setTimeout(() => {
                heroSubtitle.style.transition = 'all 0.5s ease';
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 700);
        }
        
        if (heroDescription) {
            heroDescription.style.opacity = '0';
            heroDescription.style.transform = 'translateY(20px)';
            setTimeout(() => {
                heroDescription.style.transition = 'all 0.5s ease';
                heroDescription.style.opacity = '1';
                heroDescription.style.transform = 'translateY(0)';
            }, 900);
        }
    }, 2000);
});
