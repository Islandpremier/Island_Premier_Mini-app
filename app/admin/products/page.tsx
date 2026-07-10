"use client";

import { useEffect, useState } from "react";
import Toolbar from "./components/Toolbar";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  async function loadProducts() {
    setLoading(true);

    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      if (data.success) {
        setProducts(data.products);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-7xl mx-auto">

        <Toolbar
          onNewProduct={() => {
            setSelectedProduct(null);
            setOpenModal(true);
          }}
        />

        <ProductList
          loading={loading}
          products={products}
          onEdit={(product) => {
            setSelectedProduct(product);
            setOpenModal(true);
          }}
          refresh={loadProducts}
        />

        <ProductModal
          open={openModal}
          product={selectedProduct}
          onClose={() => {
            setOpenModal(false);
            loadProducts();
          }}
        />

      </div>

    </main>
  );
}