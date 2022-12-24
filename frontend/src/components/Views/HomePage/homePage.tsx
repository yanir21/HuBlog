import React, { useEffect, useState } from "react";
import { Product } from "../../../models/Product";
import { getAllProducts } from "../../../services/cartService";
import ProductCard from "../../ProductCard/productCard";
import "./homepage.css";

interface HomePageProps {
  onProductAdd: (product: Product) => void;
  onProductRemove: (product: Product) => void;
}

const Home = (props: HomePageProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setProducts(await getAllProducts());
  };

  return (
    <div className="home">
      <div className="container">
        <div className="title">All Products</div>
        <div className="product-list">
          <div className="row">
            {products.map((product) => (
              <div key={product.name} className="col-4">
                <ProductCard
                  product={product}
                  onProductAdd={props.onProductAdd}
                  onProductRemove={props.onProductRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
