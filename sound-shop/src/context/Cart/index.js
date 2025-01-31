import { createContext } from "react";
export const CartContext = createContext({
  cartItems: 0,
  setCartItems: () => {}
});
