export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isTopRated?: boolean;
  discount?: number;
  featured?: boolean;
  targetPage?: 'shop' | 'design' | 'both';
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Modern Wooden TV Wall Unit',
    category: 'Wall Units',
    price: 899.00,
    oldPrice: 1200.00,
    rating: 5.0,
    reviews: 12,
    image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1000&auto=format&fit=crop',
    discount: 25,
    featured: true,
    isNew: true
  },
  {
    id: '2',
    name: 'Minimalist Oak Coffee Table',
    category: 'Furniture',
    price: 249.00,
    oldPrice: 299.00,
    rating: 4.8,
    reviews: 8,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000&auto=format&fit=crop',
    isNew: true
  },
  {
    id: '3',
    name: 'Velvet Accent Armchair',
    category: 'Seating',
    price: 450.00,
    rating: 4.7,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop',
    isNew: true
  },
  {
    id: '4',
    name: 'Geometric Ceramic Vase Set',
    category: 'Decor',
    price: 85.00,
    rating: 4.9,
    reviews: 24,
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=1000&auto=format&fit=crop',
    isNew: true
  },
  {
    id: '5',
    name: 'Modern Pendant Light',
    category: 'Lighting',
    price: 129.00,
    oldPrice: 159.00,
    rating: 4.6,
    reviews: 10,
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0bb03f?q=80&w=1000&auto=format&fit=crop',
    discount: 19,
    featured: true,
    isNew: true
  },
  {
    id: '6',
    name: 'Abstract Canvas Wall Art',
    category: 'Wall Decor',
    price: 199.00,
    rating: 4.5,
    reviews: 7,
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop',
    isBestSeller: true
  },
  {
    id: '7',
    name: 'Handwoven Wool Rug',
    category: 'Rugs',
    price: 350.00,
    rating: 4.8,
    reviews: 20,
    image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?q=80&w=1000&auto=format&fit=crop',
    isBestSeller: true
  },
  {
    id: '8',
    name: 'Floating Bookshelf Set',
    category: 'Storage',
    price: 145.00,
    rating: 4.4,
    reviews: 18,
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    isBestSeller: true
  },
  {
    id: '9',
    name: 'Luxury Scented Candle',
    category: 'Decor',
    price: 35.00,
    oldPrice: 45.00,
    rating: 5.0,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1000&auto=format&fit=crop',
    discount: 22,
    isBestSeller: true
  },
  {
    id: '10',
    name: 'Marble Top Side Table',
    category: 'Furniture',
    price: 175.00,
    oldPrice: 210.00,
    rating: 4.7,
    reviews: 11,
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=1000&auto=format&fit=crop',
    discount: 16,
    isBestSeller: true
  }
];
