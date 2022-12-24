import React, { useCallback, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AppNavbar from "./components/Navbar/navbar";
import Home from "./components/Views/HomePage/homePage";
import Cart from "./components/Views/Cart/cart";
import "bootstrap/dist/css/bootstrap.css";
import { ShoppingCart } from "./models/ShoppingCart";
import { Product } from "./models/Product";

function App() {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>({
    products: [],
  });

  const [showCart, setShowCart] = useState<boolean>(false);

  const addProduct = useCallback((product: Product, nadav?: string) => {
    setShoppingCart((shoppingCart) => {
      const productInCart = shoppingCart.products.find(
        (currProductInCart) => currProductInCart.product.name === product.name
      );
      if (productInCart) {
        const newCart = { ...shoppingCart };
        const productToUpdate = newCart.products.find(
          (currProductInCart) => currProductInCart.product.name === product.name
        );
        productToUpdate!.quantity++;
        return newCart;
      } else {
        return {
          products: [
            ...shoppingCart.products,
            { product: product, quantity: 1 },
          ],
        };
      }
    });
  }, []);

  const removeProduct = (product: Product) => {
    setShoppingCart((shoppingCart) => {
      const productInCart = shoppingCart.products.find(
        (currProductInCart) => currProductInCart.product.name === product.name
      );
      if (productInCart && productInCart.quantity != 0) {
        const newCart = { ...shoppingCart };
        const productToUpdate = newCart.products.find(
          (currProductInCart) => currProductInCart.product.name === product.name
        );
        productToUpdate!.quantity--;
        return newCart;
      } else {
        return {
          products: shoppingCart.products.filter(
            (currProductInCart) =>
              currProductInCart.product.name !== product.name
          ),
        };
      }
    });
  };

  return (
    <div className="App">
      <AppNavbar setShowCart={(value: boolean) => setShowCart(value)} />
      {showCart ? (
        <Cart
          cart={shoppingCart}
          onProductAdd={addProduct}
          onProductRemove={removeProduct}
        />
      ) : (
        <Home onProductAdd={addProduct} onProductRemove={removeProduct} />
      )}
    </div>
  );
}

export default App;
