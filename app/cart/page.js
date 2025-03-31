"use client"; 
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  
  
  const cartItems = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id)); 
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div>Your cart is empty!</div>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="flex justify-between items-center border-b py-2">
              <span>{item.title}</span>
              <span>${item.price} x {item.quantity}</span>
              <button onClick={() => handleRemove(item.id)} className="text-red-500">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
