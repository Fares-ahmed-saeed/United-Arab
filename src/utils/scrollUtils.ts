
export const initScrollAnimations = () => {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    for (let i = 0; i < revealElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealElements[i].getBoundingClientRect().top;
      const elementVisible = 150; // how many pixels from the bottom of the viewport to start showing the element
      
      if (elementTop < windowHeight - elementVisible) {
        revealElements[i].classList.add('active');
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
