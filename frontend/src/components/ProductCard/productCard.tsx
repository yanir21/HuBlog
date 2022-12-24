import React from "react";
import Card from "react-bootstrap/Card";
import "./productCard.css";
import { Product } from "../../models/Product";
import Button from "react-bootstrap/Button";

interface ProductCardProps {
  product: Product;
  onProductAdd: (product: Product) => void;
  onProductRemove: (product: Product) => void;
  quanitity?: number;
}

const ProductCard = (props: ProductCardProps) => {
  return (
    <>
      <Card className="card">
        <Card.Img
          className="image"
          variant="top"
          src={props.product.imageUrl}
        />
        <Card.Body>
          <Card.Title>{props.product.name}</Card.Title>
          <Card.Text>{props.product.description}</Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Footer>
            <div className="button-section">
              <Button
                className="action-button"
                onClick={() => props.onProductAdd(props.product)}
              >
                +
              </Button>
              {props.quanitity && (
                <div className="quantity">{props.quanitity}</div>
              )}
              <Button
                variant="danger"
                className="action-button"
                onClick={() => props.onProductRemove(props.product)}
              >
                -
              </Button>
            </div>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
