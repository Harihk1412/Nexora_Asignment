import React, { useState } from 'react';
import { checkout } from '../api';

export default function CheckoutModal(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handle = async () => {
    try {
      const r = await checkout({ name, email });
      alert(`Receipt: total ₹${r.data.receipt.total}\nTime: ${new Date(r.data.receipt.timestamp).toLocaleString()}`);
      // refresh cart
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      console.error(err);
      alert('Checkout failed');
    }
  };

  return (
    <div style={{marginTop:14}}>
      <h3>Checkout</h3>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} style={{padding:8,width:'100%',marginBottom:8}}/>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{padding:8,width:'100%',marginBottom:8}}/>
      <div style={{display:'flex',gap:8}}>
        <button className="btn" onClick={handle}>Place order (mock)</button>
      </div>
    </div>
  );
}
