
export const initScrollAnimations = () => {
  const revealElements = document.querySelectorAll('.reveal');
  const floatElements = document.querySelectorAll('.float-animation');
  const pulseElements = document.querySelectorAll('.pulse-animation');
  const fadeSlideElements = document.querySelectorAll('.fade-slide');
  
  // Default reveal animation
  const revealOnScroll = () => {
    for (let i = 0; i < revealElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealElements[i].getBoundingClientRect().top;
      const elementVisible = 150; // how many pixels from the bottom of the viewport to start showing the element
      
      if (elementTop < windowHeight - elementVisible) {
        revealElements[i].classList.add('active');
      } else {
        // Optional: Remove the active class if the element is not visible
        // revealElements[i].classList.remove('active');
      }
    }

    // Float animation
    for (let i = 0; i < floatElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = floatElements[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        floatElements[i].classList.add('float-active');
      }
    }

    // Pulse animation
    for (let i = 0; i < pulseElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = pulseElements[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        pulseElements[i].classList.add('pulse-active');
      }
    }

    // Fade and slide animation
    for (let i = 0; i < fadeSlideElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = fadeSlideElements[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        fadeSlideElements[i].classList.add('fade-slide-active');
      }
    }
  };

  // Add event listener
  window.addEventListener('scroll', revealOnScroll);
  
  // Initial check in case elements are already in view
  revealOnScroll();
  
  return () => {
    window.removeEventListener('scroll', revealOnScroll);
  };
};

export const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
  e.preventDefault();
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
};
