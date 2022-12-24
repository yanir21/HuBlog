import React from "react";
import { Product } from "../../../models/Product";
import { ShoppingCart } from "../../../models/ShoppingCart";
import ProductCard from "../../ProductCard/productCard";
import Button from "react-bootstrap/Button";
import { createShoppingCart } from "../../../services/cartService";
import "./cart.css";

interface CartProps {
  cart: ShoppingCart;
  onProductAdd: (product: Product, nadav?: string) => void;
  onProductRemove: (product: Product) => void;
}

const Cart = (props: CartProps) => {
  const nadav = (product: Product) => {
    props.onProductAdd(product, "mmm");
  };

  return (
    <>
      <div className="container">
        <div className="title">My Cart</div>
        <div className="product-list">
          <div>
            {props.cart.products.map((product) => (
              <div key={product.product.name} className="col-4">
                <ProductCard
                  product={product.product}
                  onProductAdd={nadav}
                  onProductRemove={props.onProductRemove}
                  quanitity={product.quantity}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button onClick={() => createShoppingCart(props.cart)}>Send</Button>
    </>
  );
};

export default Cart;
