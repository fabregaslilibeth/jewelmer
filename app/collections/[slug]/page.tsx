'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Banner from '../../components/Banner';
import { products } from '../../content/products';
import Card from '../../components/Card';
import FilterSidebar from '@/app/components/FilterSidebar';
import { filterProducts } from '@/app/utils/products';
import { formatTitle } from '@/app/utils/helpers';

const CollectionPage = () => {
  const params = useParams();
  const nameParam = params.slug as string;
  const collectionName: string = formatTitle(nameParam)

  const [collectionProducts, setCollectionProducts] = useState(products);
  const [filters, setFilters] = useState<Record<string, string[]>>({})
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [filterUsed, setFilterUsed] = useState('tags')
  
  useEffect(() => {
    // Filter products by collection
    const collectionFiltered = products.filter(product => 
      product.collection.toLowerCase() === collectionName.toLowerCase()
    );
    
    const tagFiltered = products.filter(product => 
      product.tags.includes(nameParam.toLowerCase())
    );

    // Combine both filtered results
    const filteredProducts = [...new Set([...collectionFiltered, ...tagFiltered])];
    setCollectionProducts(filteredProducts);

    // Set which filter was used
    if (collectionFiltered.length > 0 && tagFiltered.length === 0) {
      setFilterUsed('collection');
    }
  }, [collectionName, nameParam]);

  const handleFilterChange = (filters: Record<string, string[]>) => {
    const newFilteredProducts = filterProducts(collectionProducts, filters)
    setFilteredProducts(newFilteredProducts)
  }

  useEffect(() => {
    handleFilterChange(filters)
  }, [filters, handleFilterChange])

  return (
    <div className="min-h-screen">
      <Banner 
        imageUrl="https://jewelmer.com/cdn/shop/files/J2505_StrandsCampaign_PH_3000x1000_WebBanner_1512x.jpg?v=1746169423"
        height={400}
      />
      
      <div className="container mx-auto px-4 py-12 relative">
        <div className="flex gap-8">
          <FilterSidebar
            isCollectionVisible={filterUsed === 'collection'}
            onFilterChange={setFilters}
          />
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-8">{collectionName}</h1>
            {/* <p className="text-gray-600 mb-4">
              Showing products filtered by: {filterUsed === 'both' ? 'collection and tags' : filterUsed}
            </p> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-600">No products found for this collection.</p>
                  <p className="text-gray-500 mt-2">Try adjusting your filters or browse other collections.</p>
                </div>
              ) : (
                filteredProducts.map((product, index) => (
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage; 