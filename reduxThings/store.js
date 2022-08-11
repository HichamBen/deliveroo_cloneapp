import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basketSlice";
import restaurantReducer from "./restarantSlice";

export default configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer,

  }
})