import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items:[]
  },
  reducers: {
    addToBasket: (state, action) => {
        state.items = [...state.items, action.payload];
     
    },
    removeFromBasket: (state, action) => {
        let index = state.items.findIndex((item) => action.payload.id === item.id);

        const newBasket = [...state.items];

        if(index >= 0) {
            newBasket.splice(index, 1);
        } else {
            console.log("The basket is empty")
        }
      
        state.items = [...newBasket]
    },
  }
})

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectedItem = (state) => state.basket.items;
export const selectedItemById = (state, id) => state.basket.items.filter((item) => item.id === id);
export const getTotalePrice = (state) => state.basket.items.reduce((totale, item) => {
     return (totale + item.price) 
}, 0);




export default basketSlice.reducer