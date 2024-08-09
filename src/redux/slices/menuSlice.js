import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  pizzaSizes: [
    {id:'1', size: 'קטן', price: 30, image:'פיצות-ענקית.png' },
    {id:'2', size: 'בינוני', price: 40, image: 'פיצה קטנה מאד.jpg' },
    {id:'3', size: 'ענק', price: 50, image: 'פיצה.jpg' },
  ],
  toppings: [
    { id: 't1', name: 'זיתים', image:'זיתים-ירוקים-פרוסות.jpg'},
    { id: 't2', name: 'גבינה צהובה', image:  'גבינה צהובה.png'  },
    { id: 't3', name: 'חריף', image: 'שיפקה.png' },
    { id: 't4', name: ' עגבניה', image: 'עגבניה.png' },
  
],
priceToping:2,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
 
  },
});

export const selectPizzaSizes = (state) => state.menu.pizzaSizes;
export const selectToppings = (state) => state.menu.toppings;
export const  selectPriceToping = (state) => state.menu.priceToping;

export default menuSlice.reducer;
