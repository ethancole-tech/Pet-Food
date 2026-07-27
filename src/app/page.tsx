import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black font-serif text-gray-900 mb-4">Our Premium Selection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Carefully curated, nutrient-dense recipes designed for maximum health and irresistible taste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust & Quality Section */}
      <section className="bg-white border-t border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-black font-serif text-gray-900 mb-12">Why Choose Pet Food?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                🥩
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Real Ingredients</h4>
              <p className="text-gray-500">No fillers, no by-products. Just real meat and organic vegetables.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                🩺
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Vet Approved</h4>
              <p className="text-gray-500">Formulated by leading feline nutritionists for optimal health.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                🚚
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Fast Delivery</h4>
              <p className="text-gray-500">Same-day shipping on orders placed before 2 PM. Never run out again.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
