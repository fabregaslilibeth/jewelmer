'use client';

import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import FilterSidebar from '../components/FilterSidebar';
import { products } from '../content/products';
import Card from '../components/Card';
import { filterProducts } from '../utils/products';

const Collections = () => {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [filters, setFilters] = useState<Record<string, string[]>>({})

  const handleFilterChange = (filters: Record<string, string[]>) => {
    console.log('Active filters:', filters)
    const newFilteredProducts = filterProducts(products, filters)
    setFilteredProducts(newFilteredProducts)
  }

  useEffect(() => {
    handleFilterChange(filters)
  }, [filters])

  return (
    <div className="min-h-screen">
      <Banner 
        imageUrl="https://jewelmer.com/cdn/shop/files/J2505_StrandsCampaign_PH_3000x1000_WebBanner_1512x.jpg?v=1746169423"
        height={400}
      />
      
      <div className="container mx-auto px-4 py-12 relative">
        <div className="flex gap-8">
          <FilterSidebar 
            onFilterChange={setFilters}
          />
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-8">Our Collections</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Collection items will go here */}
              {filteredProducts.map((product, index) => (
                <Card
                  key={index}
                  imageUrl={product.image_url}
                  name={product.name}
                  description={product.description}
                  pricePhp={product.price_php}
                  collection={product.collection}
                  gemstones={product.gemstones}
                  pearlShape={product.pearl_shape}
                  pearlColor={product.pearl_color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections; 