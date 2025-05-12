
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { smoothScroll } from '@/utils/scrollUtils';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Adaptive image selection based on screen width
  const getBgImage = () => {
    if (windowWidth <= 640) {
      // Mobile image (smaller size)
      return "https://images.unsplash.com/photo-1606771218406-5b2b1b69ec1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80";
    } else if (windowWidth <= 1024) {
      // Tablet image (medium size)
      return "https://images.unsplash.com/photo-1613294326794-e7c74fe886e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80";
    } else {
      // Desktop image (large size)
      return "https://images.unsplash.com/photo-1598530593885-ff2e4ded75bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("${getBgImage()}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="absolute inset-0">
        <video 
          className="w-full h-full object-cover opacity-40" 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="https://cdn.coverr.co/videos/coverr-air-conditioning-system-2602/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center z-10">
        <div className="float-animation">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {t('hero.title')}
          </h1>
        </div>
        <div className="float-animation" style={{ transitionDelay: '0.2s' }}>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 float-animation" style={{ transitionDelay: '0.4s' }}>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-6 text-lg pulse-animation shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              const event = e as unknown as React.MouseEvent<HTMLAnchorElement>;
              smoothScroll(event, 'contact');
            }}
          >
            {t('hero.book')}
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-transparent border-2 border-white text-white hover:bg-white/20 px-8 py-6 text-lg"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              const event = e as unknown as React.MouseEvent<HTMLAnchorElement>;
              smoothScroll(event, 'services');
            }}
          >
            {t('hero.services')}
          </Button>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="fade-slide" style={{ transitionDelay: '0.6s' }}>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="text-white text-2xl font-bold">10+</h3>
                <p className="text-white/80">{t('hero.experience')}</p>
              </div>
            </div>
            <div className="fade-slide" style={{ transitionDelay: '0.8s' }}>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="text-white text-2xl font-bold">500+</h3>
                <p className="text-white/80">{t('hero.projects')}</p>
              </div>
            </div>
            <div className="fade-slide" style={{ transitionDelay: '1.0s' }}>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="text-white text-2xl font-bold">24/7</h3>
                <p className="text-white/80">{t('hero.support')}</p>
              </div>
            </div>
            <div className="fade-slide" style={{ transitionDelay: '1.2s' }}>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="text-white text-2xl font-bold">100%</h3>
                <p className="text-white/80">{t('hero.satisfaction')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full flex justify-center pb-10">
        <button 
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            const event = e as unknown as React.MouseEvent<HTMLAnchorElement>;
            smoothScroll(event, 'services');
          }}
          className="animate-bounce p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
          aria-label="Scroll to services"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
