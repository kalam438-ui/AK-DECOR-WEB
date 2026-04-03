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
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Tan Solid Laptop Backpack',
    category: 'Backpacks',
    price: 149.00,
    oldPrice: 185.00,
    rating: 4.5,
    reviews: 2,
    image: 'https://picsum.photos/seed/backpack1/400/500',
    discount: 19,
    featured: true,
    isNew: true
  },
  {
    id: '2',
    name: 'Brown Solid Biker Jacket',
    category: 'Jackets',
    price: 110.00,
    oldPrice: 120.00,
    rating: 4.0,
    reviews: 1,
    image: 'https://techpvcpanel.com/uploads/thumb/600_800/365eb154374645ddba274a2293370f49.jpeg',
    isNew: true
  },
  {
    id: '3',
    name: 'Men Brown Solid Mid-Top B...',
    category: 'Casual Shoes, Sneakers',
    price: 115.00,
    rating: 3.5,
    reviews: 1,
    image: 'https://picsum.photos/seed/shoes1/400/500',
    isNew: true
  },
  {
    id: '4',
    name: 'Petite Olive Green Solid Top',
    category: 'Dresses & Tops',
    price: 49.00,
    rating: 4.0,
    reviews: 1,
    image: 'https://picsum.photos/seed/top1/400/500',
    isNew: true
  },
  {
    id: '5',
    name: 'Brown Solid Laptop Bag',
    category: 'Handbags, Messenger Bag',
    price: 99.00,
    oldPrice: 120.00,
    rating: 4.5,
    reviews: 1,
    image: 'https://picsum.photos/seed/bag1/400/500',
    discount: 18,
    featured: true,
    isNew: true
  },
  {
    id: '6',
    name: 'Black Analogue and Digital ...',
    category: 'Analog Watches, Digital Watches',
    price: 1599.00,
    rating: 0,
    reviews: 0,
    image: 'https://picsum.photos/seed/watch1/400/500',
    isBestSeller: true
  },
  {
    id: '7',
    name: 'Men Navy Printed Round Ne...',
    category: 'T-Shirts',
    price: 50.00,
    rating: 3.0,
    reviews: 1,
    image: 'https://picsum.photos/seed/tshirt1/400/500',
    isBestSeller: true
  },
  {
    id: '8',
    name: 'Brown Self Design Shoulder ...',
    category: 'Handbags',
    price: 78.00,
    rating: 2.5,
    reviews: 1,
    image: 'https://picsum.photos/seed/handbag1/400/500',
    featured: true,
    isBestSeller: true
  },
  {
    id: '9',
    name: 'Brown Q Explorist HR Leather...',
    category: 'Smart Analog, Smart Watches',
    price: 1699.00,
    oldPrice: 2000.00,
    rating: 4.5,
    reviews: 1,
    image: 'https://picsum.photos/seed/smartwatch1/400/500',
    discount: 15,
    isBestSeller: true
  },
  {
    id: '10',
    name: 'Brown Solid Leather Belt',
    category: 'Belts',
    price: 15.00,
    oldPrice: 18.00,
    rating: 4.0,
    reviews: 1,
    image: 'https://picsum.photos/seed/belt1/400/500',
    discount: 17,
    isBestSeller: true
  }
];
