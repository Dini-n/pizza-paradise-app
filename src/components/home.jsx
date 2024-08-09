import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Container, Box, Card, CardMedia, CardContent, Button } from '@mui/material';
import { selectPizzaSizes } from '../redux/slices/menuSlice';
import { imgUrl } from '../config';
import './Home.css'; // Import the CSS file

const HomePage = () => {
  const pizzas = useSelector(selectPizzaSizes); // Get pizza sizes from Redux

  return (
    <Container className="container">
      <Box className="header-box">
        <Box
          component="img"
          src={`${imgUrl}/פיצה.jpg`}
          alt="Pizza Background"
          className="header-image"
        />
        <Box className="header-text-box">
          <Typography
            variant="h2"
            component="div"
            gutterBottom
            className="header-text"
          >
            ברוכים הבאים לפיצריה שלנו!
          </Typography>
        </Box>
      </Box>

      <Box className="introduction-box">
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          className="introduction-title"
        >
          גלו את הפיצות המיוחדות שלנו
        </Typography>
        <Typography
          variant="body1"
          component="div"
          paragraph
          className="introduction-description"
        >
          אנחנו מציעים מגוון פיצות טעימות, עם תוספות לבחירתכם, עשויות מהמרכיבים הטריים ביותר.
          עיינו בתפריט שלנו, בחרו את הפיצה שאתם אוהבים ותיהנו מחוויה קולינרית שאין כמותה.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          href="/order"
          className="order-button"
        >
          הזמינו עכשיו
        </Button>
      </Box>

      <Box className="pizza-section">
        <Typography
          variant="h2"
          component="div"
          gutterBottom
          className="pizza-section-title"
        >
          הפיצות שלנו
        </Typography>
        <Box className="pizza-card-container">
          {pizzas.map(pizza => (
            <Card key={pizza.id} className="pizza-card">
              <CardMedia
                component="img"
                height="140"
                image={`${imgUrl}/${pizza.image}`}
                alt={pizza.name}
              />
              <CardContent>
                <Typography variant="h6">{pizza.name}</Typography>
                <Typography variant="body2">₪{pizza.price}</Typography>
                <Typography variant="body2">{pizza.description}</Typography> {/* Description if available */}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
