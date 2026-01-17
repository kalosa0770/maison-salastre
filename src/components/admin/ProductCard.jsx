import React from "react";

const ProductCard = ({ product, onDelete, onEdit }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded shadow items-center">
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-32 h-32 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="text-sm text-stone-500">{product.description}</p>
        <p className="mt-1 font-bold">${product.price}</p>
        {product.isFeatured && (
          <span className="mt-1 inline-block bg-yellow-500 text-black px-2 py-1 text-xs rounded">
            Featured
          </span>
        )}
      </div>
      <div className="flex gap-2 mt-2 md:mt-0">
        <button
          onClick={() => onEdit(product)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
