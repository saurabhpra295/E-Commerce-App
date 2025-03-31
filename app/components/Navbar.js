"use client";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../redux/productsSlice";
import Link from "next/link";
import { FaShoppingCart, FaHeart, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
const Navbar = () => {
  const dispatch = useDispatch();
  const { filters , filteredItems } = useSelector((state) => state.products);

  // const [filteredItems, setFilteredItems] = useState([]);

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value)); 
  };

  const cartItems = useSelector((state) => state.cart);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold">
        <Link href="/">Saurabh's E-Commerce</Link>
      </div>

      <div className="flex items-center space-x-4">
        
        <input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={handleSearchChange}
          className="p-2 rounded border border-gray-300"
        />

      
        {filters.search && (
          <ul className="absolute bg-white shadow-lg z-10">
            {filteredItems.length > 0 ? (
              filteredItems.map((product) => (
                <li key={product.id} className="px-4 py-2 hover:bg-gray-200">
                  {product.title}
                </li>
              ))
            ) : (
              <li className="px-4 py-2">No products found.</li>
            )}
          </ul>
        )}

        <Link href="/products" className="text-white hover:text-gray-300">Products</Link>
        
        <Link href="/wishlist" className="text-white hover:text-gray-300 relative">
          <FaHeart />
        </Link>

        <Link href="/cart" className="text-white hover:text-gray-300 relative">
          <FaShoppingCart />
          {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {cartItems.length}
          </span>)}
        </Link>

    
        <div className="relative">
          <button className="text-white hover:text-gray-300">
            <FaUserCircle />
          </button>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



