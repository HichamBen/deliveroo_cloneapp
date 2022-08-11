import { createSlice } from '@reduxjs/toolkit';

export const restaurantSlice = createSlice({
    name: "restaurant",
    initialState: {
        restaurant: null
    },
    reducers: {
        setRestaurant: (state, action) => {
            
            state.restaurant = action.payload;
        }
    }
})

export const { setRestaurant } = restaurantSlice.actions;

export const restaurantBasket = (state) => state.restaurant.restaurant;




export default restaurantSlice.reducer;