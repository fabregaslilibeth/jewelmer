export interface Product {
    name: string;
    collection: string;
    tags: string[];
    gemstones: string[];
    pearl_shape: string;
    pearl_color: string;
    price_php: number;
    description: string;
    image_url?: string;
  }