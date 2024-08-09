// src/redux/slices/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentOrder: {
    id:0,
    price:0,
    customer: {},
    pizzas: [],
  },
  allOrders: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
   // function to all order 
    createOrder: (state, action) => {
      state.allOrders.push(action.payload);
      state.currentOrder = { customer: {}, pizzas: [] }; // Reset current order
    },
    approveOrder(state, action) {
      state.allOrders = state.allOrders.filter(order => order.id !== action.payload.id);
    },
    //function to current order
    // Function to update a specific pizza in the current order
    
    updatePizzaFromOrder: (state, action) => {
      const { id, updates } = action.payload;
      const pizzaIndex = state.currentOrder.pizzas.findIndex(pizza => pizza.id === id);
      if (pizzaIndex !== -1) {
        state.currentOrder.pizzas[pizzaIndex] = { ...state.currentOrder.pizzas[pizzaIndex], ...updates };
      }
    },
    updateCustomerInfo: (state, action) => {
      state.currentOrder.customer = action.payload;
    },
    removePizzaFromOrder: (state, action) => {
      state.currentOrder.pizzas = state.currentOrder.pizzas.filter(pizza => pizza.id !== action.payload.id);
    },

    addPizzaToOrder: (state, action) => {
      state.currentOrder.pizzas.push(action.payload);
    },
  },
});
export const selectAllOrders = (state) => state.orders.allOrders;
export const selectCurrentOrder = (state) => state.orders.currentOrder;

export const { addPizzaToOrder, createOrder, approveOrder, updateCustomerInfo, removePizzaFromOrder,updatePizzaFromOrder } = orderSlice.actions;
export default orderSlice.reducer;
