import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import menuReducer from './slices/menuSlice';


const store = configureStore({
  reducer: {
    // pizzas: pizzaReducer,
    orders: orderReducer,
    menu: menuReducer, // הוספת הסלאס ל-store

  }
});

export default store;
