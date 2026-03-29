document.addEventListener('DOMContentLoaded', () => {

    // 1. Ambient Background Orbs following mouse slightly
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        orb1.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
        orb2.style.transform = `translate(-${x * 40}px, -${y * 40}px)`;
    });

    // 2. 3D Glass Tilt Effect
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (max 10 degrees)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none'; // remove transition for smooth tracking
        });
    });

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Trigger point
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on initial load

    // 4. WhatsApp Button Logic
    const whatsappBtn = document.getElementById('whatsapp-button');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const phone = '2349033547608';
            const msg = 'Hi Muhammad, I saw your futuristic portfolio and would love to connect.';
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }

    // 5. EmailJS Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Visual feedback on button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.style.opacity = '0.7';

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            emailjs.send("service_9yonl8w", "template_jcqggzh", formData)
                .then(() => {
                    submitBtn.innerHTML = 'Transmission Sent <i class="fas fa-check"></i>';
                    submitBtn.style.background = 'var(--neon-purple)';
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = 'var(--neon-cyan)';
                        submitBtn.style.opacity = '1';
                        contactForm.reset();
                    }, 3000);
                }, (error) => {
                    alert('Protocol Failed. Please try again.');
                    console.error('EmailJS error:', error);
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.opacity = '1';
                });
        });
    }
});
