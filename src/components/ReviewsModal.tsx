"use client";

import { Product } from "../data/products";

export default function ReviewsModal({ product, onClose }: { product: Product, onClose: () => void }) {
  const avgRating = product.reviews.length 
    ? (product.reviews.reduce((acc, curr) => acc + curr.rating, 0) / product.reviews.length).toFixed(1)
    : "0.0";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-2xl font-bold font-serif text-gray-900">Reviews for {product.name}</h2>
            <div className="flex items-center mt-2 gap-2">
              <span className="text-3xl font-black text-indigo-600">{avgRating}</span>
              <span className="text-sm text-gray-500">({product.reviews.length} reviews)</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {product.reviews.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No reviews yet. Be the first!</div>
          ) : (
            product.reviews.map(review => (
              <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        {review.author}
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Verified Buyer</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mt-3">{review.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
