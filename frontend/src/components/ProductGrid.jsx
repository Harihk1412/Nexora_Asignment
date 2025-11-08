import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = async (productId) => {
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      const data = await res.json();
      console.log("✅ Added:", data);

      window.dispatchEvent(new Event("cartUpdated"));
      
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {products.map((p) => (
      <div key={p._id} className="border p-3 rounded-lg shadow flex flex-col items-center">

  {/* FIXED IMAGE BOX */}
  <div
    style={{
      width: "150px",
      height: "150px",
      overflow: "hidden",
      borderRadius: "10px",
      backgroundColor: "#f5f5f5",
    }}
  >
    <img
      src={p.image}
      alt={p.name}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  </div>

  <h2 className="font-bold text-sm mt-3">{p.name}</h2>
  <p className="text-sm">₹ {p.price}</p>

  <button
    className="bg-blue-600 text-white px-3 py-1 rounded mt-2 text-sm"
    onClick={() => addToCart(p._id)}
  >
    Add to Cart
  </button>
</div>

      ))}
    </div>
  );
};

export default Products;
