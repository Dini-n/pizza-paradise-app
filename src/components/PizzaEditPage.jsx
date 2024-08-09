import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Container, Box, Checkbox, FormGroup, FormControlLabel, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import { addPizzaToOrder, selectCurrentOrder, updatePizzaFromOrder } from '../redux/slices/orderSlice';
import { selectPizzaSizes, selectToppings, selectPriceToping } from '../redux/slices/menuSlice';
import { Add, Remove } from '@mui/icons-material';
import { imgUrl } from '../config';

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
    <Container style={{ padding: '20px', backgroundColor: '#f5f5f5', marginTop: '60px' }}>
      <Box
        sx={{
          padding: '40px',
          borderRadius: '10px',
          backgroundColor: '#fff', // Adjust as needed
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
          color: '#333',
        }}
      >
        <Typography variant="h4" component="div" gutterBottom>
          {id ? 'עריכת פיצה' : 'הוספת פיצה חדשה'}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', marginBottom: '20px', direction: 'rtl' }}>
          {pizzaSizes.map(pizzaSize => (
            <Card
              key={pizzaSize.id}
              sx={{
                maxWidth: 345,
                cursor: 'pointer',
                border: selectedPizza.size === pizzaSize.size ? '2px solid #e91e63' : 'none',
                transition: 'border-color 0.3s',
                '&:hover': {
                  borderColor: '#e91e63'
                }
              }}
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

        <FormGroup sx={{ direction: 'rtl' }}>
          {toppings.map(topping => (
            <FormControlLabel
              key={topping.id}
              control={
                <Checkbox
                  checked={selectedToppingsList.includes(topping.id)}
                  onChange={handleToppingChange}
                  value={topping.id}
                  sx={{
                    color: '#e91e63',
                    '&.Mui-checked': {
                      color: '#e91e63',
                    },
                  }}
                />
              }
              label={<Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CardMedia
                  component="img"
                  height="50"
                  image={`${imgUrl}/${topping.image}`}
                  alt={topping.name}
                  sx={{ marginRight: '10px' }}
                />
                {topping.name}
              </Box>}
            />
          ))}
        </FormGroup>

        <Typography variant="h6" component="div" gutterBottom>
          סה"כ כולל תוספות: ₪{calculateTotalPrice()}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', direction: 'rtl' }}>
          <IconButton onClick={() => handleQuantityChange(-1)}><Remove /></IconButton>
          <Typography sx={{ marginX: 2 }}>{quantity}</Typography>
          <IconButton onClick={() => handleQuantityChange(1)}><Add /></IconButton>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          <Button
            onClick={handleCancel}
            variant="outlined"
            color="error"
            sx={{
              borderColor: '#e91e63',
              color: '#e91e63',
              '&:hover': {
                borderColor: '#d81b60',
                color: '#d81b60',
              },
            }}
          >
            ביטול
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#e91e63',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#d81b60',
              },
            }}
          >
            {id ? 'שמור' : 'הוסף פיצה'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PizzaEditPage;
