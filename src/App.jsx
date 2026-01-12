import React from 'react'
import Homepage from './components/Homepage'
import { CartProvider } from './components/CartContext'
import CartToast from './components/CartToast'
import ProductModal from './components/ProductModal'

function App() {
  return (
    <CartProvider>
      <div className="selection:bg-stone-200">
        {/* Everything inside here can now access the cart */}
        <Homepage />

        <ProductModal />
        
        {/* Global UI layer */}
        <CartToast />
      </div>
    </CartProvider>
  )
}

export default App;