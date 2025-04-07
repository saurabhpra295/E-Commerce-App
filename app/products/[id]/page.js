// "use client";
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '@/app/redux/cartSlice';
// import { addToWishlist } from '@/app/redux/wishlistSlice';
// import {  useParams} from 'next/navigation';
// import { fetchProducts } from '@/app/redux/productsSlice';


// const ProductDetailsPage = () => {
//   const dispatch = useDispatch();
//   const params = useParams();
// const {id} = params

//   const product = useSelector((state) => 
//     state.products.items.find((item) => item.id === parseInt(id))
//   );

//   console.log("ID ",id)
//   console.log("Products ",useSelector(state => state.products.items.find((item) => item.id === parseInt(id))))

//   const handleAddToCart = () => {
//     dispatch(addToCart(product));
//   };

//   const handleAddToWishlist = () => {
//     dispatch(addToWishlist(product));
//   };

//   useEffect(() => {
//     if (!product) {
//       dispatch(fetchProducts());
//     }
//   }, [dispatch, product]);
  

//   if (!product) return <div>Avi Load le rha h bhai...</div>;
  
//   return (
//     <div>
//       <h1 className="text-2xl font-bold">{product.title}</h1>
//       <img src={product.images} alt={product.title} className="w-full h-48 object-cover" />
//       <p>${product.price}</p>
//       <div>
//         <button onClick={handleAddToCart} className="bg-blue-500 text-white p-2 rounded">
//           Add to Cart
//         </button>
//         <button onClick={handleAddToWishlist} className="bg-red-500 text-white p-2 rounded ml-4">
//           Add to Wishlist
//         </button>
//       </div>
//     </div>
//   );
// };

// // export async function generateStaticParams() {
// //   return [
// //     { id: '1' },
// //     { id: '2' },
// //   ];
// // }

// // export default async function ProductDetailsPage({ params }) {
// //   const res = await fetch(`https://dummyapi.com/products/${params.id}`);
// //   const product = await res.json();

  
// // }


// export default ProductDetailsPage;


"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchProducts } from "@/app/redux/productsSlice";
import { addToCart } from "@/app/redux/cartSlice";
import { addToWishlist } from "@/app/redux/wishlistSlice";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const [qty, setQty] = useState(1);

  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === parseInt(id))
  );

  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts());
    }
  }, [dispatch, product]);

  if (!product) return <div className="text-center p-10">Avi Load le rha h bhai...</div>;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: qty }));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-white rounded-3xl">
      
      <div className="text-sm text-gray-500 mb-4">
        <span className="text-black font-semibold">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        <div>
          <img
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.title}
            className="w-full h-[400px] object-cover rounded-xl mb-4"
          />
          <div className="flex gap-3">
            {(product.images || []).slice(0, 4).map((img, idx) => (
              <img
                key={idx}
                src={img}
                className="w-20 h-20 object-cover rounded-lg border hover:ring-2 ring-black border-red-300"
              />
            ))}
          </div>
        </div>

        
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">{product.title}</h2>
          <p className="text-gray-500 text-sm mb-4">
            helps develop beauty, adorable product.
          </p>

         
          <div className="flex items-center text-sm text-gray-600 mb-3">
            ⭐ 4.4 · <span className="ml-1 underline cursor-pointer">24 reviews</span>
          </div>

          <h5 className="text-2xl text-black font-bold">${product.price}</h5>
          <h5 className="text-black"> Discount {product.discountPercentage}%</h5>

          {/* <p className="text-black">Discount</p>
          <h5 className="text-2xl text-black font-bold mb-4">{product.discountPercentage}%</h5> */}



          <div className="flex items-center gap-4 mb-5">
            <label className="text-sm text-black">Qty:</label>
            <div className="flex border text-black rounded-full px-3 py-1 items-center gap-2">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
              <span className="w-6 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
          </div>

          <div className="flex gap-4 mb-5">
            <button 
            onClick={handleAddToWishlist}
            className="bg-black text-white px-5 py-2 rounded-full hover:bg-blue-400">
              Add to Wishlist
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-red-400 border border-gray-300 px-5 py-2 rounded-full hover:bg-green-400"
            >
              Add to Cart
            </button>
          </div>

          
          <div className="text-sm mb-5 text-black">
            <p className="mb-1  text-black">✅ 100% Original Products</p>
            <p className="mb-1  text-black">💳 Pay on delivery might be available</p>
            <p>🔁 {product.returnPolicy}</p>
          </div>

          <input
            type="text"
            placeholder="Enter Pincode"
            className="border p-2  text-black rounded-lg w-full mb-5"
          />

        
          <div>
            <h4 className="font-semibold  text-black mb-2">Product Description</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {/* <li>Ultra-Portable Soft Toy For Your Child To Bond With On The Go</li>
              <li>Very Soft Stuffed Toy That Is The Perfect Companion For Your Child</li>
              <li>Intricate Details Develop Your Child’s Sense Of Touch</li> */}
              <li>{product.description}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
