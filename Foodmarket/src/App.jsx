import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import List from './components/List';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import "@fortawesome/fontawesome-free/css/all.min.css";


const App = () => {
  // ✅ Step 3: Add cart state
  const [cartItems, setCartItems] = useState([]);

  // ✅ Function to add food items to the cart
  const handleAddToCart = (food) => {
    setCartItems([...cartItems, food]);
  };

  return (
    <>
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        {/* ✅ Pass handleAddToCart to List component */}
        <Route path="/List" element={<List onAddToCart={handleAddToCart} />} />
        {/* ✅ Pass cartItems to Cart component */}
        <Route path="/Cart" element={<Cart cartItems={cartItems} />} />
        <Route path='/checkout' element={<Checkout/>}/>
      </Routes>
    </Router>
    </>
  );
};

export default App;
