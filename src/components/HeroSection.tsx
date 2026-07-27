export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-pink-50/50 blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-50/50 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-semibold text-sm mb-8">
              Premium Quality Pet Food
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black font-serif text-gray-900 leading-tight mb-6">
              Food they <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">purr</span> for.
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0">
              Elevate your feline's diet with organic, vet-approved meals. 
              Because they aren't just pets, they're royalty.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 rounded-full bg-gray-900 text-white font-bold text-lg hover:bg-indigo-600 transition-all duration-300">
                Shop the Menu
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 mt-16 lg:mt-0 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80" 
                alt="Happy Cat eating" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
