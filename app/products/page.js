// "use client"; 
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../redux/productsSlice';
// import PaginationComponent from '../components/PaginationComponent';
// import Link from 'next/link';
// const ProductsPage = () => {
//   const dispatch = useDispatch();
//   const { loading, error, filteredItems } = useSelector((state) => state.products);
  
//   const [currentPage, setCurrentPage] = useState(1);
  

//   useEffect(() => {
//     const page = Number(new URLSearchParams(window.location.search).get('page')) || 1;
//     setCurrentPage(page);
    
//     dispatch(fetchProducts(currentPage));
//   }, [dispatch, currentPage]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Products</h1>

//        <h1 className=''>saurabh codepage</h1>


//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {filteredItems.length > 0 ? (
//           filteredItems.map((product) => (
//            <Link key={product.id} href={'/products/${product.id}'} className="border p-4 rounded">
//               <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
//               <h3 className="text-lg font-bold">{product.title}</h3>
//               <p>${product.price}</p>
//               <div>
//                 {[...Array(5)].map((_, index) => (
//                   <span key={index} className={index < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}>
//                     ★
//                   </span>
//                 ))}
//               </div>
//            </Link>
//           ))
//         ) : (
//           <div>No products found.</div> 
//         )}
//       </div>

//       <PaginationComponent totalPages={Math.ceil(filteredItems?.length / 10)} currentPage={currentPage} />
//     </div>
//   );
// };

// export default ProductsPage;


"use client"; 
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';
import PaginationComponent from '../components/PaginationComponent';
import Link from 'next/link';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { loading, error, filteredItems } = useSelector((state) => state.products);
  
  const [currentPage, setCurrentPage] = useState(1);
  
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]); 

  useEffect(() => {
    const page = Number(new URLSearchParams(window.location.search).get('page')) || 1;
    setCurrentPage(page);
    
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  
  const filteredProducts = filteredItems.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesColor = selectedColor ? product.color === selectedColor : true;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesCategory && matchesColor && matchesPrice;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      
      <div className="filters mb-4 bg-white">
        <select onChange={(e) => setSelectedCategory(e.target.value)} className="mr-4 bg-purple-500 rounded">
          <option value="">All Categories</option>
          <option value="fragrances">Fragrances</option>
          <option value="clothing">Clothing</option>
          <option value="beauty">Beauty</option>
        </select>

        <select onChange={(e) => setSelectedColor(e.target.value)} className="mr-4 bg-violet-500 rounded">
          <option value="">All Colors</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          
        </select>

        <label htmlFor="priceRange" className="mr-4 bg-green-700 rounded">Max Price: ${priceRange[1]}</label>
        <input 
          
          type="range" 
          id="priceRange" 
          min={0} 
          max={50} 
          value={priceRange[1]} 
          onChange={(e) => setPriceRange([0, e.target.value])} 
          
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="border p-4 rounded">
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p>${product.price}</p>
              <p>${product.category}</p>
              
              <div>
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={index < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
            </Link>
          ))
        ) : (
          <div>No products found.</div> 
        )}
      </div>

     
      <PaginationComponent totalPages={Math.ceil(filteredProducts.length / 10)} currentPage={currentPage} />
    </div>
  );
};

export default ProductsPage;
