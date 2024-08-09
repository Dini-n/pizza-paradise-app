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
import { selectPizzaSizes } from '../redux/slices/menuSlice'; 
import { imgUrl } from '../config';
import Grid from '@mui/material/Grid'; 

import './OrderManagementPage.css'; // Import the CSS file

const OrderManagementPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(selectAllOrders);
  const pizzaSizes = useSelector(selectPizzaSizes); 

  const handleNavigateToOrderDetails = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  return (
    <Container className="order-management-container">
      <Typography variant="h3" component="div" gutterBottom textAlign="center">
        ניהול הזמנות
      </Typography>
      {orders.length === 0 ? (
        <Typography variant="h6" color="text.primary" textAlign="center">
          אין הזמנות במערכת
        </Typography>
      ) : (
        <List className="order-list">
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <ListItem
                alignItems="flex-start"
                className="order-list-item"
              >
                <IconButton
                  aria-label="view"
                  onClick={() => handleNavigateToOrderDetails(order.id)}
                  className="view-button"
                >
                  <VisibilityIcon className="view-icon" />
                </IconButton>

                <Box className="order-info">
                  <Typography variant="h6" className="customer-name">{order.customerName}</Typography>
                  <Grid container spacing={2}>
                    {order.pizzas.map((pizza) => {
                      const pizzaSize = pizzaSizes.find(p => p.id === pizza.idSelectedPizza); 
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={pizza.id}>
                          <Box className="pizza-card">
                            <Avatar alt="Pizza" src={`${imgUrl}/${pizzaSize ? pizzaSize.image : 'default-pizza.jpg'}`} className="pizza-image" />
                            <Box className="pizza-details">
                              <Typography variant="body2" color="text.primary">
                                גודל: {pizzaSize ? pizzaSize.size : 'לא זמין'}
                              </Typography>
                              <Typography variant="body2" color="text.primary">
                                כמות: {pizza.quantity}
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
