'use client';

import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import FilterSidebar from '../components/FilterSidebar';
import { products } from '../content/products';
import Card from '../components/Card';

const Collections = () => {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [filters, setFilters] = useState<Record<string, string[]>>({})

  const handleFilterChange = (filters: Record<string, string[]>) => {
    console.log('Active filters:', filters)

    const hasActiveFilters = Object.values(filters).some(values => values.length > 0)

    if (!hasActiveFilters) {
      setFilteredProducts(products)
      return
    }

    const newFilteredProducts = products.filter(product => {
      return Object.entries(filters).every(([filterKey, filterValues]) => {
        if (filterValues.length === 0) return true
  
        const productValue = (product as any)[filterKey]
  
        if (!productValue) return false
  
         // Special handling for price_php filter
        if (filterKey === 'price_php') {
          const price = Number(product.price_php)

          return filterValues.some(range => {
            if (range === '29,999 and under') {
              return price <= 29999
            }
            if (range === '30,000 to 49,999') {
              return price >= 30000 && price <= 49999
            }
            if (range === '50,000 to 99,999') {
              return price >= 50000 && price <= 99999
            }
            if (range === '100,000 and over') {
              return price >= 100000
            }
            return false
          })
        }

        if (Array.isArray(productValue)) {
          // ✅ Match if at least one value is included
          return productValue.some((val: string) => filterValues.includes(val))
        } else {
          return filterValues.includes(String(productValue))
        }
      })
    })

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