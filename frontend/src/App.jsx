import React from 'react';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';

export default function App(){
  return (
    <div>
      <div className="header">
        <div style={{fontWeight:700}}>VIBE COMMERCE</div>
        <div style={{fontSize:14}}>Mock E-Com Cart</div>
      </div>

      <div className="container" style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:20}}>
        <main>
          <ProductGrid />
        </main>
        <aside>
          <Cart />
          <CheckoutModal />
        </aside>
      </div>
    </div>
  );
}
