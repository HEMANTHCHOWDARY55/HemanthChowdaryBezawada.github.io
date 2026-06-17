document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for nav links is handled by CSS, 
  // but we implement active state tracking here
  
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current) && current !== '') {
        link.classList.add('active');
      }
    });
  });

  // Contact links are standard anchors now

  // Resume Modal Logic
  const modal = document.getElementById('resumeModal');
  const navBtn = document.getElementById('navResumeBtn');
  const heroBtn = document.getElementById('heroResumeBtn');
  const closeBtn = document.getElementById('closeModalBtn');

  function openModal(e) {
    e.preventDefault();
    modal.classList.add('show');
  }

  function closeModal() {
    modal.classList.remove('show');
  }

  if (navBtn) navBtn.addEventListener('click', openModal);
  if (heroBtn) heroBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Certificate Modal Logic
  const certModal = document.getElementById('certModal');
  const certModalImg = document.getElementById('certModalImg');
  const certModalTitle = document.getElementById('certModalTitle');
  const certModalFallback = document.getElementById('certModalFallback');
  const certModalFallbackText = document.getElementById('certModalFallbackText');
  const closeCertBtn = document.getElementById('closeCertModalBtn');
  const certCards = document.querySelectorAll('.cert-card');

  // Handle broken images for certificates by hiding them on main page
  const certImgs = document.querySelectorAll('.cert-img');
  certImgs.forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
    });
    // Check if already failed to load before event listener is registered
    if (img.complete && img.naturalWidth === 0) {
      img.style.display = 'none';
    }
  });

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3').textContent;
      const imgEl = card.querySelector('.cert-img');
      const imgSrc = imgEl ? imgEl.getAttribute('src') : card.getAttribute('data-cert-src');
      
      certModalTitle.textContent = title;
      
      // Reset displays
      certModalImg.style.display = 'none';
      certModalFallback.style.display = 'none';
      
      // Clear any previous PDF iframes
      const oldIframe = certModal.querySelector('iframe');
      if (oldIframe) oldIframe.remove();
      
      if (imgSrc.toLowerCase().endsWith('.pdf')) {
        // Create an iframe to render the PDF file beautifully
        const iframe = document.createElement('iframe');
        iframe.src = imgSrc;
        iframe.style.width = '100%';
        iframe.style.height = '70vh';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '4px';
        certModal.querySelector('.cert-modal-body').appendChild(iframe);
      } else {
        // Render as an image
        certModalImg.src = imgSrc;
        certModalImg.style.display = 'block';
        
        // If the source is a placeholder or fails to load
        certModalImg.onerror = () => {
          certModalImg.style.display = 'none';
          certModalFallbackText.textContent = title;
          certModalFallback.style.display = 'flex';
        };
      }
      
      certModal.classList.add('show');
    });
  });

  if (closeCertBtn) {
    closeCertBtn.addEventListener('click', () => {
      certModal.classList.remove('show');
      // Clear any iframe on close to stop loading
      const oldIframe = certModal.querySelector('iframe');
      if (oldIframe) oldIframe.remove();
    });
  }

  // Close modal when clicking outside the modal content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
    if (e.target === certModal) {
      certModal.classList.remove('show');
      const oldIframe = certModal.querySelector('iframe');
      if (oldIframe) oldIframe.remove();
    }
  });

});
