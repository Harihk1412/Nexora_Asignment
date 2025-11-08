import React, { useEffect, useState } from 'react';
import { getCart, updateCartQty, removeCartItem } from '../api';

export default function Cart(){
  const [cart, setCart] = useState({ items: [], total: 0 });

  const load = async () => {
    try {
      const r = await getCart();
      setCart(r.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=> {
    load();
    window.addEventListener('cartUpdated', load);
    return ()=> window.removeEventListener('cartUpdated', load);
  }, []);

  const inc = async (id, qty) => {
    try {
      await updateCartQty(id, qty + 1);
      load();
    } catch (err) { console.error(err); }
  };
  const dec = async (id, qty) => {
    if (qty <= 1) return;
    try {
      await updateCartQty(id, qty - 1);
      load();
    } catch (err) { console.error(err); }
  };
  const removeItem = async (id) => {
    try {
      await removeCartItem(id);
      load();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="cartPanel">
      <h3>Your Cart</h3>
      {cart.items.length === 0 ? <div style={{marginTop:10}}>Cart is empty</div> : (
        <>
          {cart.items.map(i=>(
            <div className="cartItem" key={i.id}>
              <div>
                <div style={{fontWeight:600}}>{i.name}</div>
                <div style={{fontSize:13,color:'#6b7280'}}>₹{i.price} × {i.qty}</div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <button className="btn ghost" onClick={()=> dec(i.id, i.qty)}>-</button>
                <div>{i.qty}</div>
                <button className="btn ghost" onClick={()=> inc(i.id, i.qty)}>+</button>
                <button className="btn ghost" onClick={()=> removeItem(i.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div style={{textAlign:'right', marginTop:8, fontWeight:700}}>Total: ₹{cart.total}</div>
        </>
      )}
    </div>
  );
}
