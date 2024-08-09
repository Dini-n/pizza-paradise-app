import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Container, Box, Card, CardMedia, CardContent, Button } from '@mui/material';
import { selectPizzaSizes } from '../redux/slices/menuSlice';
import { imgUrl } from '../config';

const HomePage = () => {
  const pizzas = useSelector(selectPizzaSizes); // Get pizza sizes from Redux

  return (
    <Container style={{ padding: '20px', direction: 'rtl', backgroundColor: '#f0f0f0' }}>
      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
          marginBottom: '40px',
        }}
      >
        <Box
          component="img"
          src={`${imgUrl}/פיצה.jpg`}
          alt="Pizza Background"
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: '20px',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '1000px', // Ensure text width does not exceed image width
            zIndex: 1,
          }}
        >
          <Typography
            variant="h2"
            component="div"
            gutterBottom
            sx={{
              color: '#fff',
              padding: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better readability
              borderRadius: '20px',
              display: 'inline-block',
              width: '100%',
            }}
          >
            ברוכים הבאים לפיצריה שלנו!
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{
            color: '#333',
            padding: '10px',
            display: 'inline-block',
          }}
        >
          גלו את הפיצות המיוחדות שלנו
        </Typography>
        <Typography
          variant="body1"
          component="div"
          paragraph
          sx={{
            color: '#333',
            padding: '10px',
            maxWidth: '600px',
            margin: '20px auto',
          }}
        >
          אנחנו מציעים מגוון פיצות טעימות, עם תוספות לבחירתכם, עשויות מהמרכיבים הטריים ביותר.
          עיינו בתפריט שלנו, בחרו את הפיצה שאתם אוהבים ותיהנו מחוויה קולינרית שאין כמותה.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          href="/order"
          sx={{
            marginTop: '20px',
            backgroundColor: '#e64a19', // Example dark color
            color: '#fff',
            borderRadius: '10px',
            padding: '10px 20px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#d84315',
            },
          }}
        >
          הזמינו עכשיו
        </Button>
      </Box>

      <Box
        sx={{
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          backgroundColor: '#fff',
          marginTop: '40px',
        }}
      >
        <Typography
          variant="h2"
          component="div"
          gutterBottom
          sx={{
            marginBottom: '20px',
            color: '#333',
          }}
        >
          הפיצות שלנו
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', overflowX: 'auto' }}>
          {pizzas.map(pizza => (
            <Card key={pizza.id} sx={{ maxWidth: 345 }}>
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
