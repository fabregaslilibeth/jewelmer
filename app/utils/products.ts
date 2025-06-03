import { Product } from '../content/products';

type FilterRecord = Record<string, string[]>;

export const filterProducts = (products: Product[], filters: FilterRecord): Product[] => {
  const hasActiveFilters = Object.values(filters).some(values => values.length > 0);

  if (!hasActiveFilters) {
    return products;
  }

  return products.filter(product => {
    return Object.entries(filters).every(([filterKey, filterValues]) => {
      if (filterValues.length === 0) return true;

      const productValue = product[filterKey as keyof Product];

      if (!productValue) return false;

      // Special handling for price_php filter
      if (filterKey === 'price_php') {
        const price = Number(product.price_php);

        return filterValues.some(range => {
          if (range === '29,999 and under') {
            return price <= 29999;
          }
          if (range === '30,000 to 49,999') {
            return price >= 30000 && price <= 49999;
          }
          if (range === '50,000 to 99,999') {
            return price >= 50000 && price <= 99999;
          }
          if (range === '100,000 and over') {
            return price >= 100000;
          }
          return false;
        });
      }

      if (Array.isArray(productValue)) {
        // Match if at least one value is included
        return productValue.some((val: string) => filterValues.includes(val));
      } else {
        return filterValues.includes(String(productValue));
      }
    });
  });
}; 