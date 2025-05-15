
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { initScrollAnimations } from '@/utils/scrollUtils';
import ProductsSection from '@/components/ProductsSection';
import ARViewer from '@/components/ARViewer';

const Products = () => {
  const [arViewerOpen, setARViewerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    image: '',
    name: '',
  });

  // Initialize scroll animations when the component mounts
  useEffect(() => {
    const cleanup = initScrollAnimations();
    return () => {
      cleanup();
    };
  }, []);

  // Handler to open AR viewer
  const handleOpenARViewer = (productImage: string, productName: string) => {
    setSelectedProduct({
      image: productImage,
      name: productName,
    });
    setARViewerOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        <ProductsSection onViewAR={handleOpenARViewer} />
      </div>
      <ARViewer 
        open={arViewerOpen}
        onOpenChange={setARViewerOpen}
        productImage={selectedProduct.image}
        productName={selectedProduct.name}
      />
    </div>
  );
};

export default Products;
