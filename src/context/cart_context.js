import React, { useEffect, useContext, useReducer,useState } from 'react'
import reducer from '../reducers/cart_reducer'
import axios from "axios"
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  SET_CART
} from '../actions'

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const initialState = {
    cart: [],
    total_items: 0,
    total_amount: 0,
    shipping_fee: 534,
  };

  const cart = [];
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [cartItems, setCartItems] = useState([]);
  // Fetch cart data from API on component mount
  useEffect(() => {
    axios.get('http://localhost:4000/apis/getcart')
      .then(response => {
        // Assuming the API response is an array of cart items
        dispatch({ type: SET_CART, payload: response.data });
        // console.log(response.data, "surya");
        
        // console.log(cart,"sury");
      })
      .catch(error => {
        console.error('Error fetching cart data from API:', error);
      });
  }, []); // Empty dependency array to run only once on component mount

  // add to cart
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  }

  // remove item
  const removeItem = (name) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: name });
  }

  // toggle amount
  const toggleAmount = (id, value) => {
    dispatch({
      type: TOGGLE_CART_ITEM_AMOUNT,
      payload: {
        id,
        value,
      },
    });
  }

  // clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  }
  // console.log(cart,"sura");
  // Use Axios to send a post request to update the cart data on each state.cart change
  useEffect(() => {
    state.cart.forEach((item) => {
      axios.post('http://localhost:4000/apis/cart', {
        name: item.name,
        price: item.price,
        color: item.color,
        amount: item.amount,
      })
        .then(response => {
          console.log('Response from server:', response.data);
        })
        .catch(error => {
          console.error('Error sending data to server:', error);
        });
    });
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart}}
    >
      {children}
    </CartContext.Provider>
  );
}

export const  useCartContext = () => {
  return useContext(CartContext);
}
