"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/app/redux/cartSlice';
import { addToWishlist } from '@/app/redux/wishlistSlice';
import {  useParams} from 'next/navigation';
import { fetchProducts } from '@/app/redux/productsSlice';


const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
const {id} = params

  const product = useSelector((state) => 
    state.products.items.find((item) => item.id === parseInt(id))
  );

  console.log("ID ",id)
  console.log("Products ",useSelector(state => state.products.items.find((item) => item.id === parseInt(id))))

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
  };

  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts());
    }
  }, [dispatch, product]);
  

  if (!product) return <div>Avi Load le rha h bhai...</div>;
  
  return (
    <div>
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img src={product.images} alt={product.title} className="w-full h-48 object-cover" />
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

// export async function generateStaticParams() {
//   return [
//     { id: '1' },
//     { id: '2' },
//   ];
// }

// export default async function ProductDetailsPage({ params }) {
//   const res = await fetch(`https://dummyapi.com/products/${params.id}`);
//   const product = await res.json();

  
// }


export default ProductDetailsPage;
