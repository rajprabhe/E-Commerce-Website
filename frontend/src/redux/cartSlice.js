import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
}


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // console.log("Before:", state.cartItems);
      const item = action.payload
      // If existing product found
      // const existItem = state.cartItems.find((x) => x.productID === item.productID)
      const existItem = state.cartItems.find((x) => {
        // console.log("x.productId:", x.productId);
        // console.log("item.productId:", item.productId);
        // console.log("Equal:", x.productId === item.productId);
        return x.productId === item.productId;
      });
      // add in cartItems with update value
      // map return new array
      // note end likhe hai
      console.log("Exist:", existItem);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.productID === existItem.productID ? item : x)
        console.log(state.cartItems)
      } else {
        // if product not found
        // add existing cartItems array
        // because dose not return new array
        state.cartItems.push(item)
        // console.log(state.cartItems)
      }
      console.log("After:", state.cartItems);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.productId !== action.payload)
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    clearCart: (state, action) => {
      state.cartItems = []
      localStorage.removeItem('cartItems')
    }
  }
})


export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer


/**
Bahut accha question hai. Isme do cheezein samajhni zaruri hain:

JavaScript array methods (map, filter, push)
Redux Toolkit (Immer) ka behavior
Initial State
state.cartItems = [
  { productId: 1, qty: 1 },
  { productId: 2, qty: 2 }
];
Case 1: push() - Naya array nahi banta
state.cartItems.push(item);

Suppose

item = { productId: 3, qty: 1 };

Before:

[
  { productId: 1, qty: 1 },
  { productId: 2, qty: 2 }
]

After:

[
  { productId: 1, qty: 1 },
  { productId: 2, qty: 2 },
  { productId: 3, qty: 1 }
]

push() existing array ko hi modify karta hai.

JavaScript me naya array nahi banta.

Case 2: map() - Naya array banta hai
state.cartItems = state.cartItems.map((x) =>
  x.productId === existItem.productId ? item : x
);

Suppose

item = { productId: 2, qty: 5 };

Old array

[
  { productId: 1, qty: 1 },
  { productId: 2, qty: 2 }
]
map kya karta hai?

Iteration 1

x = { productId: 1, qty: 1 }

return x

Iteration 2

x = { productId: 2, qty: 2 }

return item

Ab map() internally ek naya array banata hai

[
  { productId: 1, qty: 1 },
  { productId: 2, qty: 5 }
]

Aur phir

state.cartItems = newArray;

ho jata hai.

Case 3: filter() - Naya array banta hai
state.cartItems = state.cartItems.filter(
    x => x.productId !== action.payload
)

Suppose

action.payload = 2;

Old array

[
  { productId: 1 },
  { productId: 2 },
  { productId: 3 }
]

filter() naya array return karega

[
  { productId: 1 },
  { productId: 3 }
]

Phir

state.cartItems = newArray;
Redux Toolkit me ye kaise kaam karta hai?

Tum dekh rahe hoge

state.cartItems.push(item);

Aur

state.cartItems = state.cartItems.map(...)

Dono likhe hue hain.

Normally Redux me state immutable hoti hai, isliye mutation allowed nahi hota.

Lekin Redux Toolkit Immer use karta hai.

Immer tumhare liye automatically immutable state bana deta hai.

Tum aise likhte ho

state.cartItems.push(item);

Lekin internally Immer isko convert karta hai kuch is tarah:

return {
   ...state,
   cartItems: [...state.cartItems, item]
}

Isi wajah se Redux Toolkit me mutation jaisa code likhne ki permission hoti hai.

Memory Diagram
Before

state
   │
   ▼
cartItems ─────► [A, B]
push()
[A, B]
   │
   ▼
[A, B, C]

Same array modify hota hai (JavaScript level par).

map()
Old Array
[A, B]
   │
map()
   ▼
New Array
[A, B(updated)]

state.cartItems = New Array

Purana array alag hai, naya array alag hai.

Rule yaad rakho
Method	Naya Array Banata Hai?	Original Array Modify Karta Hai?
map()	✅ Yes	                  ❌ No
filter()✅ Yes	                  ❌ No
slice()	✅  Yes                     ❌ No
concat()✅ Yes	                    ❌ No
push()	❌ No                       	✅ Yes
pop()	❌ No                           	✅ Yes
splice()	❌ No                       	✅ Yes
shift()	❌ No	                        ✅ Yes
unshift()	❌ No                       	✅ Yes

Redux Toolkit (Immer) ki wajah se chahe tum push() use karo ya map(), Redux ko hamesha final me ek naya immutable state milta hai. Bas JavaScript ke level par push() array ko mutate karta hai, jabki map() aur filter() khud naya array return karte hain. 
 */