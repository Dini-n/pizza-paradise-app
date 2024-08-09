import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { approveOrder, selectAllOrders } from '../redux/slices/orderSlice';
import { Container, Button } from '@mui/material';
import { imgUrl } from '../config';
import { selectToppings, selectPizzaSizes, selectPriceToping } from '../redux/slices/menuSlice';
import './OrderDetailsPage.css'; // Import the CSS file

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const orders = useSelector(selectAllOrders);
  const priceToping = useSelector(selectPriceToping);

  const order = orders.find((order) => order.id === id);

  // Get toppings and pizza sizes from Redux
  const toppings = useSelector(selectToppings);
  const pizzaSizes = useSelector(selectPizzaSizes);

  const handleApprove = () => {
    dispatch(approveOrder({ id }));
    // Optionally navigate to the Manage Orders Page after approval
    navigate('/order-management'); // Navigate to the Manage Orders Page
  };

  const handleBack = () => {
    navigate('/order-management'); // Navigate back to Manage Orders Page
  };

  const getPizzaSizeById = (id) => {
    return pizzaSizes.find(p => p.id === id) || {};
  };

  const getToppingById = (id) => {
    return toppings.find(t => t.id === id) || {};
  };

  const calculatePrice = (pizza, pizzaSize) => {
    const toppingsPrice = pizza.toppings.reduce((total, toppingId) => {
      const topping = getToppingById(toppingId);
      return total + (topping ? priceToping : 0);
    }, 0);
    return (pizzaSize ? pizzaSize.price : 0) * pizza.quantity + toppingsPrice;
  };

  const handleGetPriceToPizza = (pizza, pizzaSize) => {
    return calculatePrice(pizza, pizzaSize);
  };

  if (!order) {
    return (
      <Container className="container">
        <Typography variant="h6" color="text.primary" className="page-title">
          ההזמנה לא נמצאה
        </Typography>
      </Container>
    );
  }

  return (
    <Container className="container">
      <Typography variant="h3" component="div" gutterBottom className="page-title">
        פרטי הזמנה
      </Typography>
      <Typography variant="h6" component="div" gutterBottom className="customer-info">
        שם הלקוח: {order.customer.name}
      </Typography>
      <Typography variant="h6" component="div" gutterBottom className="customer-info">
        כתובת הלקוח: {order.customer.address}
      </Typography>
      <Box className="order-price">
        <Typography variant="h6" color="text.primary">
          מחיר כולל להזמנה ₪{order.price}
        </Typography>
      </Box>
      {order.pizzas.map((pizza) => {
        // Find pizza size details
        const pizzaSize = pizzaSizes.find(p => p.id === pizza.idSelectedPizza);

        return (
          <Box key={pizza.id} className="pizza-details">
            <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="h6" component="div" className="pizza-info">
                  פיצה: {pizzaSize ? pizzaSize.size : pizza.size}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar className="pizza-avatar" alt="Pizza" src={`${imgUrl}/${pizzaSize ? pizzaSize.image : pizza.image}`} />
                  <Typography variant="body2" color="text.primary" className="pizza-quantity">
                    כמות: {pizza.quantity}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="h6" color="text.primary" className="pizza-info">
                  תוספות:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  {pizza.toppings.map((toppingId) => {
                    const topping = toppings.find(t => t.id === toppingId);
                    return topping ? (
                      <Card key={toppingId} className="topping-card">
                        <CardContent>
                          <Avatar
                            alt={topping.name}
                            src={`${imgUrl}/${topping.image}`}
                            className="topping-avatar"
                          />
                          <Typography variant="body2" color="text.primary">
                            {topping.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    ) : null;
                  })}
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ margin: '20px 0' }} />
          </Box>
        );
      })}
      <Box className="button-container">
        <Box className="button-group">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBack}
            className="button"
          >
            חזרה
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleApprove}
            className="button"
          >
            אישור הזמנה
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default OrderDetailsPage;
