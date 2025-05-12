
import React from 'react';
import { Button } from '@/components/ui/button';
import { smoothScroll } from '@/utils/scrollUtils';

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="container mx-auto px-4 text-center z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
          Expert Air Conditioning Solutions
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Installation, maintenance, and sales services for all your HVAC needs
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button 
            size="lg" 
            className="bg-brand-blue hover:bg-brand-blue-dark text-white px-8 py-6 text-lg"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              const event = e as unknown as React.MouseEvent<HTMLAnchorElement>;
              smoothScroll(event, 'contact');
            }}
          >
            Book Now
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
            Our Services
          </Button>
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
