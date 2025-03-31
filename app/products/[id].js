"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { addToCart } from '../redux/cartSlice';
import { addToWishlist } from '../redux/wishlistSlice';

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query; 

  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === parseInt(id))
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
      <p>${product.price}</p>
      <div>
        <button onClick={handleAddToCart} className="bg-blue-500 text-white p-2 rounded">
          Add to Cart
        </button>
        <button onClick={handleAddToWishlist} className="bg-red-500 text-white p-2 rounded ml-4">
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
