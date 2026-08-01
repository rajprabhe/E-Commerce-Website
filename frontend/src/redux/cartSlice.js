import { createSlice } from "@reduxjs/toolkit";

// Initial State
// Agar localStorage me cartItems hai to wahi load honge
// Warna empty array se start hoga
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    
    // Add Product / Update Qty
    addToCart: (state, action) => {
      // Jo product dispatch hua hai
      const item = action.payload;

      // Check karo product cart me already hai ya nahi
      const existItem = state.cartItems.find(
        (x) => x.productId === item.productId
      );

      console.log("Item:", item);
      console.log("Exist Item:", existItem);

      if (existItem) {
       
        // Product already cart me hai
        // Sirf uski quantity update hogi
        // map() new array return karta hai
        state.cartItems = state.cartItems.map((x) =>
          x.productId === item.productId ? item : x
        );

        console.log("Quantity Updated");
      } else {
  
        // Product cart me nahi hai
        // Naya product add karo
        // push() existing array ko modify karta hai
        // Redux Toolkit ka Immer internally immutable state bana deta hai
        state.cartItems.push(item);

        console.log("New Product Added");
      }

      console.log("Updated Cart:", state.cartItems);

      // Updated cart ko localStorage me save karo
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );
    },

  
    // Remove Product
    removeFromCart: (state, action) => {
      // action.payload me productId aayega
      state.cartItems = state.cartItems.filter(
        (x) => x.productId !== action.payload
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );
    },

  
    // Clear Complete Cart
    clearCart: (state) => {
      state.cartItems = [];

      // localStorage bhi clear hoga
      localStorage.removeItem("cartItems");
    },
  },
});

// Export Actions
export const {
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

// Export Reducer
export default cartSlice.reducer;