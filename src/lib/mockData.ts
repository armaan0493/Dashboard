export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  discount?: number;
}

export interface Deal extends Product {
  timeLeft: string;
  sold: number;
}

export const categories = [
  { id: "electronics", name: "Electronics", icon: "📱" },
  { id: "fashion", name: "Fashion", icon: "👗" },
  { id: "home", name: "Home", icon: "🏠" },
  { id: "beauty", name: "Beauty", icon: "💄" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "grocery", name: "Grocery", icon: "🛒" },
];

export const todaysDeals: Deal[] = [
  {
    id: "deal-1",
    name: "Wireless Bluetooth Headphones",
    price: 49.99,
    originalPrice: 99.99,
    discount: 50,
    rating: 4.5,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    timeLeft: "5h 32m",
    sold: 234,
  },
  {
    id: "deal-2",
    name: "Smart Watch Series 7",
    price: 199.99,
    originalPrice: 349.99,
    discount: 43,
    rating: 4.8,
    reviews: 1523,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    timeLeft: "3h 15m",
    sold: 456,
  },
  {
    id: "deal-3",
    name: "4K Action Camera",
    price: 129.99,
    originalPrice: 249.99,
    discount: 48,
    rating: 4.6,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
    timeLeft: "8h 45m",
    sold: 167,
  },
  {
    id: "deal-4",
    name: "Portable Bluetooth Speaker",
    price: 39.99,
    originalPrice: 79.99,
    discount: 50,
    rating: 4.4,
    reviews: 1234,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    timeLeft: "6h 20m",
    sold: 389,
  },
];

export const smartphones: Product[] = [
  {
    id: "phone-1",
    name: "iPhone 15 Pro Max",
    price: 1199.99,
    rating: 4.9,
    reviews: 5432,
    image: "https://images.unsplash.com/photo-1592286927505-c80d2b5e8e1c?w=400&h=400&fit=crop",
  },
  {
    id: "phone-2",
    name: "Samsung Galaxy S24 Ultra",
    price: 1099.99,
    rating: 4.8,
    reviews: 4231,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
  },
  {
    id: "phone-3",
    name: "Google Pixel 8 Pro",
    price: 899.99,
    rating: 4.7,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
  },
  {
    id: "phone-4",
    name: "OnePlus 12",
    price: 799.99,
    rating: 4.6,
    reviews: 1834,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
  },
];

export const laptops: Product[] = [
  {
    id: "laptop-1",
    name: "MacBook Pro 16\" M3",
    price: 2499.99,
    rating: 4.9,
    reviews: 3421,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
  },
  {
    id: "laptop-2",
    name: "Dell XPS 15",
    price: 1799.99,
    rating: 4.7,
    reviews: 2345,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
  },
  {
    id: "laptop-3",
    name: "HP Spectre x360",
    price: 1499.99,
    rating: 4.6,
    reviews: 1876,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
  },
  {
    id: "laptop-4",
    name: "Lenovo ThinkPad X1",
    price: 1699.99,
    rating: 4.8,
    reviews: 2134,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
  },
];

export const fashion: Product[] = [
  {
    id: "fashion-1",
    name: "Designer Leather Jacket",
    price: 199.99,
    originalPrice: 399.99,
    discount: 50,
    rating: 4.7,
    reviews: 876,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
  },
  {
    id: "fashion-2",
    name: "Classic Denim Jeans",
    price: 79.99,
    rating: 4.5,
    reviews: 1234,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
  },
  {
    id: "fashion-3",
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    rating: 4.6,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
  },
  {
    id: "fashion-4",
    name: "Running Sneakers",
    price: 129.99,
    originalPrice: 179.99,
    discount: 28,
    rating: 4.8,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  },
];
