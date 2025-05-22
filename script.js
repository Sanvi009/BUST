document.addEventListener('DOMContentLoaded', function() {
  const menuLinks = document.querySelectorAll('.menu-list a');
  const contentSections = document.querySelectorAll('.content-section');

  // Initialize first section
  activateSection('home');

  // Menu click handlers
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('href').substring(1);
      activateSection(sectionId);
    });
  });

  function activateSection(sectionId) {
    // Deactivate all sections and links
    contentSections.forEach(section => {
      section.classList.remove('active');
    });
    menuLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Activate current section and link
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');
    document.querySelector(`.menu-list a[href="#${sectionId}"]`).classList.add('active');

    // Special handling for home section animations
    if (sectionId === 'home') {
      resetHomeAnimations();
    }
    // Special handling for offer section animations
    if (sectionId === 'offer') {
      resetOfferAnimations();
    }

    // Special handling for students section animations
    if (sectionId === 'students') {
      resetStudentAnimations();
    }
    if (sectionId === 'professors') {
      resetProfessorAnimations();
    }
    // Special handling for about section animations
    if (sectionId === 'about') {
      resetAboutAnimations();
    }

    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  function resetOfferAnimations() {
    const offerCards = document.querySelectorAll('.offer-card');

    offerCards.forEach((card, index) => {
      card.style.animation = 'none';
      void card.offsetWidth; // Trigger reflow
      card.style.animation = `cardSlideUp 0.8s ease-out ${index * 0.1 + 0.3}s forwards`;
    });

    const sectionTitle = document.querySelector('#offer .section-title');
    if (sectionTitle) {
      sectionTitle.style.animation = 'none';
      void sectionTitle.offsetWidth;
      sectionTitle.style.animation = 'fadeIn 1s ease-out 0.2s forwards';
    }
  }
  function resetAboutAnimations() {
    const founderCards = document.querySelectorAll('.founder-card');

    founderCards.forEach((card, index) => {
      // Reset animation
      card.style.animation = 'none';
      void card.offsetWidth; // Trigger reflow

      // Reapply animation with delay
      card.style.animation = `fadeIn 1s ease-out ${index * 0.2 + 0.2}s forwards`;
    });
  }
  function resetProfessorAnimations() {
    const professorCards = document.querySelectorAll('.professor-card');

    professorCards.forEach((card, index) => {
      // Reset animation state
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';

      // Apply animation with delay
      setTimeout(() => {
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 150 + 200);
    });
  }

  function resetHomeAnimations() {
    const bustTitle = document.querySelector('.bust-title');
    const bustLetters = document.querySelectorAll('.bust-letter');
    const bustFullform = document.querySelector('.bust-fullform');
    const banglaSubtitle = document.querySelector('.bangla-subtitle');

    // Reset animations by temporarily removing and re-adding them
    const resetElementAnimation = (element, animation) => {
      if (element) {
        element.style.animation = 'none';
        void element.offsetWidth; // Trigger reflow
        element.style.animation = animation;
      }
    };

    // Reset each element with its specific animation
    resetElementAnimation(bustTitle, 'floatIn 1s ease-out forwards, pulse 2s ease-in-out infinite 1s');
    resetElementAnimation(bustFullform, 'floatIn 1s ease-out 0.3s forwards');
    resetElementAnimation(banglaSubtitle, 'fadeIn 1s ease-out 0.5s forwards');

    // Add hover effects for letters
    bustLetters.forEach(letter => {
      letter.addEventListener('mouseenter', function() {
        this.style.animation = 'shake 0.5s ease, rainbow 2s linear infinite';
      });
      letter.addEventListener('mouseleave', function() {
        this.style.animation = '';
      });
    });

    // Add hover effect for fullform
    if (bustFullform) {
      bustFullform.addEventListener('mouseenter', function() {
        this.style.animation = 'floatIn 1s ease-out 0.3s forwards, pulse 1s ease infinite';
      });
      bustFullform.addEventListener('mouseleave', function() {
        this.style.animation = 'floatIn 1s ease-out 0.3s forwards';
      });
    }
  }

  function resetStudentAnimations() {
    const studentCards = document.querySelectorAll('.student-card');

    studentCards.forEach((card, index) => {
      // Reset animation state
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';

      // Apply animation with delay
      setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100 + 200);

      // Hover effects
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 30px rgba(0, 170, 255, 0.2)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
      });
    });
  }

  // Initialize animations on first load
  resetHomeAnimations();

  // Initialize student animations if students section is active by default
  if (document.getElementById('students').classList.contains('active')) {
    resetStudentAnimations();
  }
});