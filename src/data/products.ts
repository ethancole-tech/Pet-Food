export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  isReal: boolean;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  image: string;
  inStock: boolean;
  reviews: Review[];
  category: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Premium Salmon Feast",
    description: "Rich in omega-3s for a shiny coat and healthy heart. Your cat will purr for more.",
    price: 35.00,
    discountedPrice: 28.00,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    category: "Dry Food",
    reviews: [
      { id: "r1", author: "Sarah M.", rating: 5, text: "My cat absolutely loves this! Her coat is so shiny now.", isReal: false, date: "2023-10-15" },
      { id: "r2", author: "John D.", rating: 4, text: "Great product, fast shipping.", isReal: true, date: "2023-11-02" }
    ]
  },
  {
    id: "p2",
    name: "Organic Chicken Pate",
    description: "Grain-free, wet food pate made with 100% organic chicken. Perfect for sensitive stomachs.",
    price: 45.00,
    discountedPrice: 36.00,
    image: "https://images.unsplash.com/photo-1623366302587-bca25391e63a?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    category: "Wet Food",
    reviews: [
      { id: "r3", author: "Emily R.", rating: 5, text: "The only food my picky eater will touch.", isReal: false, date: "2023-09-20" }
    ]
  },
  {
    id: "p3",
    name: "Hairball Control Formula",
    description: "Specially formulated to reduce hairballs and support indoor cat health.",
    price: 30.00,
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80",
    inStock: false,
    category: "Specialty",
    reviews: []
  },
  {
    id: "p4",
    name: "Kitten Formula (Turkey & Rice)",
    description: "High protein for growing kittens with added DHA for brain development.",
    price: 40.00,
    discountedPrice: 32.00,
    image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    category: "Dry Food",
    reviews: [
      { id: "r4", author: "Mike T.", rating: 5, text: "Perfect for our new rescue kitten.", isReal: false, date: "2023-12-01" }
    ]
  }
];
