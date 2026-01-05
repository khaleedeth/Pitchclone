document.addEventListener('DOMContentLoaded', () => {

  /* =======================
     MOBILE MENU
  ======================== */
  const hamburger = document.querySelector('.ham');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');

      const icon = hamburger.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      }
    });
  }


  /* =======================
     HERO TABS
  ======================== */
  const heroTabs = document.querySelectorAll('.hero-tab');
  const previews = document.querySelectorAll('.preview-item');

  heroTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      heroTabs.forEach(t => t.classList.remove('active'));
      previews.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      document.querySelector(`[data-content="${target}"]`)?.classList.add('active');
    });
  });


  /* =======================
     INTEGRATIONS CAROUSEL
  ======================== */
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dots = document.querySelectorAll('.dot');
  const cards = document.querySelectorAll('.integration-card');

  if (!track || !cards.length) return;

  let currentIndex = 0;
  let cardsPerView = 3;

  function updateCardsPerView() {
    if (window.innerWidth <= 768) cardsPerView = 1;
    else if (window.innerWidth <= 1024) cardsPerView = 2;
    else cardsPerView = 3;
  }

  function totalSlides() {
    return Math.ceil(cards.length / cardsPerView);
  }

  function moveToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, totalSlides() - 1));

    const cardWidth = cards[0].offsetWidth + 32;
    track.style.transform = `translateX(-${currentIndex * cardWidth * cardsPerView}px)`;

    dots.forEach((dot, i) =>
      dot.classList.toggle('active', i === currentIndex)
    );
  }

  prevBtn?.addEventListener('click', () => moveToSlide(currentIndex - 1));
  nextBtn?.addEventListener('click', () => moveToSlide(currentIndex + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => moveToSlide(i));
  });

  window.addEventListener('resize', () => {
    updateCardsPerView();
    moveToSlide(0);
  });

  updateCardsPerView();
  moveToSlide(0);
});

// Simple Integrations Carousel - Bootstrap Style
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    
    // Show specific slide
    function showSlide(n) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Wrap around if needed
        if (n >= slides.length) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = n;
        }
        
        // Add active class to current slide
        slides[currentSlide].classList.add('active');
        
        // Add active class to current indicator
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.add('active');
        }
    }
    
    // Next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Event listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carouselInner = document.querySelector('.carousel-inner');
    
    if (carouselInner) {
        carouselInner.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carouselInner.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right
            prevSlide();
        }
    }
    
    // Optional: Auto-play
    // Uncomment to enable auto-rotation every 5 seconds
    /*
    let autoplayInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    if (carouselInner) {
        carouselInner.addEventListener('mouseenter', function() {
            clearInterval(autoplayInterval);
        });
        
        carouselInner.addEventListener('mouseleave', function() {
            autoplayInterval = setInterval(nextSlide, 5000);
        });
    }
    */
    
    // Initialize
    showSlide(0);
});








