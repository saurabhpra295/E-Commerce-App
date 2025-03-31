"use client"; 

import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/wishlistSlice';

const WishlistPage = () => {
  const dispatch = useDispatch();
  
  
  const wishlistItems = useSelector((state) => state.wishlist);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id)); 
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div>Your wishlist is empty!</div>
      ) : (
        <ul>
          {wishlistItems.map(item => (
            <li key={item.id} className="flex justify-between items-center border-b py-2">
              <span>{item.title}</span>
              <button onClick={() => handleRemove(item.id)} className="text-red-500">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;
