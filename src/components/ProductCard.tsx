"use client";

import { useState } from "react";
import { Product } from "../data/products";
import ReviewsModal from "./ReviewsModal";

export default function ProductCard({ product }: { product: Product }) {
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  return (
    <div className="group relative bg-white/80 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="absolute top-4 left-4 z-10">
        {product.inStock ? (
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            In Stock
          </span>
        ) : (
          <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            Out of Stock
          </span>
        )}
      </div>

      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="text-xs text-indigo-500 font-semibold uppercase tracking-wider mb-2">
          {product.category}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-end gap-3 mb-6">
          {product.discountedPrice ? (
            <>
              <span className="text-3xl font-black text-indigo-600">${product.discountedPrice.toFixed(2)}</span>
              <span className="text-lg text-gray-400 line-through mb-1">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-3xl font-black text-indigo-600">${product.price.toFixed(2)}</span>
          )}
        </div>

        <div className="flex gap-3">
          <button
            disabled={!product.inStock}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${
              product.inStock
                ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {product.inStock ? "Add to Cart" : "Sold Out"}
          </button>
          
          <button
            onClick={() => setIsReviewsOpen(true)}
            className="p-3 rounded-xl border-2 border-indigo-100 text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-center font-bold"
          >
            Reviews ({product.reviews.length})
          </button>
        </div>
      </div>

      {isReviewsOpen && (
        <ReviewsModal 
          product={product} 
          onClose={() => setIsReviewsOpen(false)} 
        />
      )}
    </div>
  );
}
