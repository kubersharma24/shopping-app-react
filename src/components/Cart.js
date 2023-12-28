// src/components/Cart.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Cart = ({ cart, setCart, removeItemFromCart}) => {
  const calculateTotal = () => {
    return cart.reduce((total, product) => total + (product.quantity * product.price), 0);
  };

  return (
    <Container className="my-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Row>
            {cart.map((product) => (
              <Col key={product.id} md={4} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={product.thumbnail} />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => removeItemFromCart(product)}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
                <span>quantity = {product.quantity}</span>
              </Col>
            ))}
          </Row>
          <Row>
            <Col className="text-right">
              <h4>Total Amount: Rs. {calculateTotal().toFixed(2)}</h4>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Cart;
