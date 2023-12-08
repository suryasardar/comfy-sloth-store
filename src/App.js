import React   from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
   Sign,
  Logins
} from './pages';
import images from './assets/images';
 
function App() {
  return (
 
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' exact element={<Home />} />
        <Route path='logins' exact element={<Logins />} />
        <Route path='Sign' exact element={<Sign />} />
          <Route path='about' element={<About />} />
          <Route path='cart' element={<Cart />} />
          <Route path='products' element={<Products />} />
        <Route path='products/:id' element={<SingleProduct images={images}  />} />
          <Route
            path='checkout'
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    
  );
}

export default App;
