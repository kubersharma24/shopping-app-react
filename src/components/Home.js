// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Input, InputGroup, InputGroupText, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import axios from 'axios';
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';

const Home = ({ token, setCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [cart, setLocalCart] = useState([]); 
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [itemInCart, setItemInCart] = useState([]);
  const tokenDetails = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if(!tokenDetails) navigate("/login");
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();
  }, [token]);

  useEffect(() => {
    
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (minPrice !== '') {
      filtered = filtered.filter((product) => product.price >= parseInt(minPrice, 10));
    }

    if (maxPrice !== '') {
      filtered = filtered.filter((product) => product.price <= parseInt(maxPrice, 10));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, minPrice, maxPrice, products]);

  const addToCart = (product) => {
    // setCart([...filteredProducts, product]);
    // setCart([product]);
    // setLocalCart([...cart, product]);
    let quantity = 1;
    let alreadyPresent = false;
    const itemInCartArray = itemInCart.map(item=>{
      if(item.id===product.id){
        item.quantity = item.quantity+1;
        alreadyPresent = true;  
      }
      return item;
    })
    if(alreadyPresent){
      setItemInCart([...itemInCartArray])
    }else{
      product = {...product, quantity}
      setItemInCart([...itemInCart, product])
    }
    
  };
  const removeItemFromCart = (product) =>{
    const remaningItems = itemInCart.filter(item=>item.id!==product.id&&product)
    setItemInCart(remaningItems);
  }

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <Container className="my-4">
      
      {itemInCart.length>0 && <Cart cart={itemInCart} setCart={setCart} removeItemFromCart={removeItemFromCart}  />}
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <Input
              placeholder="Search by name"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroupText>
              <Button color="secondary">Search</Button>
            </InputGroupText>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <Input
              placeholder="Min Price"
              type="number"
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input
              placeholder="Max Price"
              type="number"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <InputGroupText>
              <Button color="secondary">Filter</Button>
            </InputGroupText>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card style={{ height: '100%' }}>
              <CardImg top src={product.thumbnail} alt={product.title} />
              <CardBody style={{ overflow: 'hidden' }}>
                <CardTitle>{product.title}</CardTitle>
                <CardText>{product.description}</CardText>
                <CardText>Price = Rs. {product.price}</CardText>
                <Button color="primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      
    </Container>
  );
};

export default Home;
