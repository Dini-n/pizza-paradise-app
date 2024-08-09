import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Container, Box, Checkbox, FormGroup, FormControlLabel, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import { addPizzaToOrder, selectCurrentOrder, updatePizzaFromOrder } from '../redux/slices/orderSlice';
import { selectPizzaSizes, selectToppings, selectPriceToping } from '../redux/slices/menuSlice';
import { Add, Remove } from '@mui/icons-material';
import { imgUrl } from '../config';

import './PizzaEditPage.css'; // Import the CSS file

const PizzaEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pizzaSizes = useSelector(selectPizzaSizes);
  const toppings = useSelector(selectToppings);
  const priceToping = useSelector(selectPriceToping);
  const currentOrder = useSelector(selectCurrentOrder);

  const PizzaInMenu = id ? currentOrder.pizzas.find(i => i.id === id) : null;
  const IdPizzaInMenu = id ? PizzaInMenu ? PizzaInMenu.idSelectedPizza : null : null;
  const pizza = id ? pizzaSizes.find(p => p.id === IdPizzaInMenu) : null;

  // States for pizza details
  const [selectedPizza, setSelectedPizza] = React.useState(pizza ? pizza : '');
  const [quantity, setQuantity] = React.useState(PizzaInMenu ? PizzaInMenu.quantity : 0);
  const [selectedToppings, setSelectedToppings] = React.useState(PizzaInMenu ? PizzaInMenu.toppings : []);
  const selectedToppingsList = selectedToppings.map(toppingId => toppingId);

  // Validate pizza existence
  React.useEffect(() => {
    if (id && !pizza) {
      console.error('פיצה לא נמצאה');
      navigate('/order');
    }
  }, [pizza, id, navigate]);

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedPizza.size || quantity === 0) return 0;
    const pizzaSize = pizzaSizes.find(p => p.size === selectedPizza.size);
    const toppingsPrice = selectedToppings.reduce((total, toppingId) => {
      const topping = toppings.find(t => t.id === toppingId);
      return total + (topping ? priceToping : 0);
    }, 0);
    return (pizzaSize ? pizzaSize.price : 0) * quantity + toppingsPrice;
  };

  const handleSave = () => {
    if (!selectedPizza.size || quantity <= 0) {
      alert('נא לבחור פיצה ולוודא שהכמות גדולה מ-0');
      return;
    }
    const updatedPizza = {
      id: (id) || Date.now().toString(),
      idSelectedPizza: selectedPizza.id,
      quantity: quantity,
      toppings: selectedToppings,
    };
    if (!id) {
      dispatch(addPizzaToOrder(updatedPizza));
    } else {
      dispatch(updatePizzaFromOrder({ id, updates: updatedPizza }));
    }
    navigate('/order');
  };

  const handleToppingChange = (event) => {
    const { value } = event.target;
    setSelectedToppings(prevToppings =>
      prevToppings.includes(value) ? prevToppings.filter(t => t !== value) : [...prevToppings, value]
    );
  };

  const handlePizzaSelect = (pizza) => {
    setQuantity(1); // Reset quantity when a new pizza is selected
    setSelectedPizza(pizza);
  };

  const handleQuantityChange = (change) => {
    setQuantity(quantity => Math.max(0, quantity + change)); // Ensure quantity is at least 0
  };

  const handleCancel = () => {
    navigate('/order');
  };

  return (
    <Container className="pizza-edit-container">
      <Box className="pizza-edit-box">
        <Typography variant="h4" component="div" gutterBottom>
          {id ? 'עריכת פיצה' : 'הוספת פיצה חדשה'}
        </Typography>

        <Box className="pizza-size-selection">
          {pizzaSizes.map(pizzaSize => (
            <Card
              key={pizzaSize.id}
              className={`pizza-card ${selectedPizza.size === pizzaSize.size ? 'selected' : ''}`}
              onClick={() => handlePizzaSelect(pizzaSize)}
            >
              <CardMedia
                component="img"
                height="140"
                image={`${imgUrl}/${pizzaSize.image}`}
                alt={pizzaSize.size}
              />
              <CardContent>
                <Typography variant="h6">{pizzaSize.size}</Typography>
                <Typography variant="body2">₪{pizzaSize.price}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <FormGroup className="topping-group">
          {toppings.map(topping => (
            <FormControlLabel
              key={topping.id}
              control={
                <Checkbox
                  checked={selectedToppingsList.includes(topping.id)}
                  onChange={handleToppingChange}
                  value={topping.id}
                />
              }
              label={<Box className="topping-label">
                <CardMedia
                  component="img"
                  height="50"
                  image={`${imgUrl}/${topping.image}`}
                  alt={topping.name}
                />
                {topping.name}
              </Box>}
            />
          ))}
        </FormGroup>

        <Typography variant="h6" component="div" gutterBottom>
          סה"כ כולל תוספות: ₪{calculateTotalPrice()}
        </Typography>
        <Box className="quantity-controls">
          <IconButton onClick={() => handleQuantityChange(-1)}><Remove /></IconButton>
          <Typography className="quantity-display">{quantity}</Typography>
          <IconButton onClick={() => handleQuantityChange(1)}><Add /></IconButton>
        </Box>
        <Box className="action-buttons">
          <Button
            onClick={handleCancel}
            variant="outlined"
            color="warning"
            className="cancel-button"
          >
            ביטול
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="warning"
            className="save-button"
          >
            {id ? 'שמור' : 'הוסף פיצה'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PizzaEditPage;
