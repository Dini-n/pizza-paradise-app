// src/components/OrderManagementPage.jsx
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { selectAllOrders } from '../redux/slices/orderSlice';
import { selectPizzaSizes } from '../redux/slices/menuSlice'; // Import pizza sizes selector
import { imgUrl } from '../config';
import Grid from '@mui/material/Grid'; // Import Grid from MUI

const OrderManagementPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(selectAllOrders);
  const pizzaSizes = useSelector(selectPizzaSizes); // Get pizza sizes from Redux

  const handleNavigateToOrderDetails = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  return (
    <Container style={{ flexGrow: 1, minHeight: '100vh', padding: '20px', direction: 'rtl', backgroundColor: '#f0f0f0', marginTop: '60px' }}>
      <Typography variant="h3" component="div" gutterBottom textAlign="center">
        ניהול הזמנות
      </Typography>
      {orders.length === 0 ? (
        <Typography variant="h6" color="text.primary" textAlign="center">
          אין הזמנות במערכת
        </Typography>
      ) : (
        <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper', margin: 'auto' }}>
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  display: 'flex',
                  flexDirection: 'row', // Place items in a row
                  alignItems: 'center', // Align items vertically centered
                  padding: '10px', // Reduce padding
                  marginBottom: '10px', // Reduce margin between items
                  maxWidth: '800px', // Set a maximum width for each order
                  margin: 'auto'
                }}
              >
                <IconButton
  aria-label="view"
  onClick={() => handleNavigateToOrderDetails(order.id)}
  sx={{ 
    width: '100px', // Adjust width
    height: '100px', // Adjust height
    marginLeft: '40px'
  }}
>
  <VisibilityIcon sx={{ fontSize: '40px' }} /> {/* Inherit the size from IconButton */}
</IconButton>

                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ marginBottom: '5px' }}>{order.customerName}</Typography>
                  <Grid container spacing={2} alignItems="center">
                    {order.pizzas.map((pizza) => {
                      const pizzaSize = pizzaSizes.find(p => p.id === pizza.idSelectedPizza); // Find pizza size
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={pizza.id} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
                          <Avatar alt="Pizza" src={`${imgUrl}/${pizzaSize ? pizzaSize.image : 'default-pizza.jpg'}`} sx={{ width: 100, height: 80 }} />
                          <Box sx={{ marginLeft: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px' }}>
                            <Box sx={{ marginRight: '20px', marginLeft:'80px' }}>
                              <Typography variant="body2" color="text.primary">
                                גודל:
                              </Typography>
                              <Typography variant="body2" color="text.primary">
                                {pizzaSize ? pizzaSize.size : 'לא זמין'}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="body2" color="text.primary" display={'10px'}>
                                כמות:
                              </Typography>
                              <Typography variant="body2" color="text.primary">
                                {pizza.quantity}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
};

export default OrderManagementPage;
