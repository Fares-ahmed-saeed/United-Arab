
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';

// Function to fetch products from API
const fetchProducts = async () => {
  // Using a free product API - this is a sample one
  const response = await fetch('https://dummyjson.com/products/category/laptops');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.products;
};

// Transform the API data to fit our needs
const transformProductData = (products: any[]) => {
  return products.map((product: any) => ({
    id: product.id,
    name: product.title,
    description: product.description,
    price: `$${product.price}`,
    features: [
      `${product.brand}`,
      `${product.rating}/5 Rating`,
      `${product.discountPercentage}% Discount`,
      `Stock: ${product.stock}`
    ],
    image: product.thumbnail
  }));
};

const ProductsSection = () => {
  const { t, language } = useLanguage();
  
  // Fetch products using React Query
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    select: transformProductData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{t('products.title')}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>
        
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            <p className="ml-4 text-lg text-gray-600">{t('products.loading')}</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center mx-auto max-w-2xl">
            <p>{t('products.error')}</p>
          </div>
        )}
        
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {products?.map((product, index) => (
              <div 
                key={product.id} 
                className="reveal"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full flex flex-col border shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {product.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                    <p className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent mt-4">{product.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white">
                      {t('products.viewDetails')}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
