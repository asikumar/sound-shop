import { BrowserRouter, Routes, Route } from 'react-router'
import { Products, Product, Layout, Home, Help, Login } from './components'
import './App.css'
import { CartContext } from "./context/Cart";
import { useEffect, useState } from 'react';
import { apiRequestHandler, GETMYCART } from './api/api';

const App = () => {
  const [cartItems, setCartItems] = useState(0)

  useEffect(()=>{
    const fetchData = async() => {
      const response = await apiRequestHandler(GETMYCART, 'GET')
      console.log(response)
      setCartItems(response.length)
    }
    if(sessionStorage.getItem('login')||true){
      fetchData()
    }
  },[])
  return (
    <CartContext.Provider value={{cartItems, setCartItems}}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route index element={<Home/>}></Route>
            <Route path='/products' element={<Products/>}></Route>
            <Route path='/products/:product' element={<Product/>}></Route>
            <Route path='/help' element={<Help/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
  </CartContext.Provider>
  )
}

export default App
