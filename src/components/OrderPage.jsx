import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, CardMedia, List, ListItem, ListItemText, IconButton, Divider, Container, Box, TextField, Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { createOrder, selectCurrentOrder, updateCustomerInfo } from '../redux/slices/orderSlice';
import { selectPizzaSizes, selectPriceToping, selectToppings } from '../redux/slices/menuSlice';
import { imgUrl } from '../config';

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector(selectCurrentOrder);
  const priceToping = useSelector(selectPriceToping);
  const pizzaSizes = useSelector(selectPizzaSizes);
  const toppings = useSelector(selectToppings);

  const pizzas = order.pizzas || [];
  const customer = order.customer || {}; // Customer details from Redux

  const [customerName, setCustomerName] = React.useState(customer.name || '');
  const [customerAddress, setCustomerAddress] = React.useState(customer.address || '');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  React.useEffect(() => {
    setCustomerName(customer.name || '');
    setCustomerAddress(customer.address || '');
  }, [customer]);

  // Update Redux state when customerName or customerAddress changes
  React.useEffect(() => {
    dispatch(updateCustomerInfo({
      name: customerName,
      address: customerAddress,
    }));
  }, [customerName, customerAddress, dispatch]);

  const getPizzaSizeById = (id) => {
    return pizzaSizes.find(p => p.id === id) || {};
  };

  const getToppingById = (id) => {
    return toppings.find(t => t.id === id) || {};
  };

  const calculatePrice = (pizza, pizzaSize) => {
    let toppingsPrice = 0;
  
    // Calculate topping prices
    pizza.toppings.forEach(toppingId => {
      const topping = getToppingById(toppingId);
      if (topping) {
        toppingsPrice += priceToping;
      }
    });
  
    // Calculate total pizza price
    return (pizzaSize ? pizzaSize.price : 0) * pizza.quantity + toppingsPrice;
  };

  const handleAddPizza = () => {
    navigate(`/add-pizza`);
  };

  const handleEditPizza = (pizza) => {
    navigate(`/edit-pizza/${pizza.id}`);
  };

  const handleGetPriceToPizza = (pizza, pizzaSize) => {
    return calculatePrice(pizza, pizzaSize);
  };

  const handleSubmitOrder = () => {
    if (!customerName || !customerAddress) {
      setErrorMessage('עליך למלא את כל פרטי הלקוח.');
      setSnackbarOpen(true);
      return;
    }
    if (pizzas.length === 0) {
      setErrorMessage('עליך לבחור לפחות פיצה אחת.');
      setSnackbarOpen(true);
      return;
    }
    if (window.confirm("האם אתה בטוח שאתה רוצה לשלוח את ההזמנה?")) {
      let totalPrice = 0;

      pizzas.forEach(pizza => {
        const pizzaSize = getPizzaSizeById(pizza.idSelectedPizza);
        totalPrice += calculatePrice(pizza, pizzaSize);
      });

      const newOrder = {
        ...order,
        id: Date.now().toString(),
        price: totalPrice,
        customer: {
          name: customerName,
          address: customerAddress,
        },
      };
      dispatch(createOrder(newOrder));
      navigate('/'); // Redirect after order is created
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container style={{ backgroundColor: '#f0f0f0', marginTop: '60px', minHeight: '100vh', padding: '20px', direction: 'rtl' }}>
      <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
        <Typography
          variant="h3"
          component="div"
          gutterBottom
          sx={{ color: '#333' }}
        >
          דף הזמנות
        </Typography>
      </Box>

      <Box mb={4} sx={{textAlign:'right'}}>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}
        >
          פרטי הלקוח
        </Typography>
        <Box sx={{ textAlign: 'right', maxWidth: '400px', margin: '0 auto', padding: '10px', borderRadius: '5px' }}>
          <TextField
            label="שם הלקוח"
            variant="outlined"
            fullWidth
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            onBlur={() => dispatch(updateCustomerInfo({ name: customerName, address: customerAddress }))}
            sx={{ 
              marginBottom: '20px', 
              '& .MuiInputLabel-root': { 
                color: '#333', 
                textAlign: 'right', direction: 'rtl'
              }, 
              '& .MuiOutlinedInput-root': { 
                borderColor: '#e64a19', 
                '&:hover': { 
                  borderColor: '#d84315' 
                }, 
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                  borderColor: '#e64a19' 
                },
                '& input': {
                  textAlign: 'right' // Align the text inside the input field to the right
                }
              } 
            }}
          />
          <TextField
            label="כתובת"
            variant="outlined"
            fullWidth
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            onBlur={() => dispatch(updateCustomerInfo({ name: customerName, address: customerAddress }))}
            sx={{ 
              marginBottom: '20px', 
              '& .MuiInputLabel-root': { 
                color: '#333', 
                textAlign: 'right', direction: 'rtl' 
              }, 
              '& .MuiOutlinedInput-root': { 
                borderColor: '#e64a19',
                '&:hover': { 
                  borderColor: '#d84315' 
                }, 
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                  borderColor: '#e64a19' 
                },
                '& input': {
                  textAlign: 'right' // Align the text inside the input field to the right
                }
              } 
            }}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <Button
          onClick={handleAddPizza}
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          sx={{ 
            backgroundColor: '#ffb74d', 
            '&:hover': { 
              backgroundColor: '#ff9800' 
            } 
          }}
        >
          הוסף פיצה
        </Button>

        <Button
          onClick={handleSubmitOrder}
          variant="contained"
          color="secondary"
          sx={{ 
            backgroundColor: '#ffb74d', 
            '&:hover': { 
              backgroundColor: '#ff9800' 
            } 
          }}
        >
          שלח הזמנה
        </Button>
      </Box>
      {pizzas.length > 0 && (
      <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
        {pizzas.map((pizza) => {
          const pizzaSize = getPizzaSizeById(pizza.idSelectedPizza); // Get the pizza size by id
          return (
            <React.Fragment key={pizza.id}>
              <ListItem>
                <CardMedia
                  component="img"
                  height="100"
                  image={`${imgUrl}/${pizzaSize.image || 'default-pizza.jpg'}`} // Use the pizza size image
                  alt={pizzaSize.name || 'Pizza'}
                  sx={{ width: '100px', marginRight: '20px' }}
                />
                <ListItemText 
                  primary={`פיצה: ${pizzaSize.size}, כמות: ${pizza.quantity}`}
                  secondary={`מחיר: ₪${handleGetPriceToPizza(pizza, pizzaSize)}, תוספות:`}
                  sx={{ textAlign: 'right' ,padding:'30px'}} // Align text to the right
                />
                <Box>
                  {pizza.toppings.map((toppingId) => {
                    const topping = getToppingById(toppingId);
                    return (
                      <Box key={toppingId} sx={{ display: 'flex', alignItems: 'center' }}>
                        <CardMedia
                          component="img"
                          height="40"
                          image={`${imgUrl}/${topping.image || 'default-topping.jpg'}`} // Use the topping image
                          alt={topping.name || 'Topping'}
                          sx={{ width: '40px', marginRight: '10px' }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{padding:'30px'}}>
                          {topping.name}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditPizza(pizza)}
                  sx={{ marginLeft: 'auto' }}
                >
                  <EditIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
      )}
      
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OrderPage;
