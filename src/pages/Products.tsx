
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { initScrollAnimations } from '@/utils/scrollUtils';
import ProductsSection from '@/components/ProductsSection';

const Products = () => {
  // Initialize scroll animations when the component mounts
  useEffect(() => {
    const cleanup = initScrollAnimations();
    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        <ProductsSection />
      </div>
    </div>
  );
};

export default Products;
