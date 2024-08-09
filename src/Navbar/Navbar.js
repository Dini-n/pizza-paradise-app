import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { imgUrl } from '../config';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // שינוי ערך לפי הצורך
    };

    window.addEventListener('scroll', handleScroll);

    // ניקוי האזנה
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: isScrolled ? 'rgba(62, 62, 62, 0.8)' : '#3e3e3e', // צבע רקע עם שקיפות לאחר גלילה
        padding: '0 20px',
        boxShadow: isScrolled ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none', // הוספת צל כאשר הגלילה
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        transition: 'background-color 0.3s, box-shadow 0.3s', // אנימציה לשינוי צבע הרקע
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', direction: 'rtl' }}>
        {/* לוגו */}
        <Box
          component="img"
          src={`${imgUrl}לוגו פיצה.png`}
          alt="Logo"
          sx={{ height: 50, position: 'absolute', left: '20px' }}
        />
        
        {/* קישורים */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ color: '#ffffff', borderBottom: '2px solid #d32f2f', fontSize: '18px', textTransform: 'none' }}
          >
            <Typography variant="button">דף הבית</Typography>
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/order"
            sx={{ color: '#ffffff', borderBottom: '2px solid #d32f2f', fontSize: '18px', textTransform: 'none' }}
          >
            <Typography variant="button">דף הזמנה</Typography>
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/order-management"
            sx={{ color: '#ffffff', borderBottom: '2px solid #d32f2f', fontSize: '18px', textTransform: 'none' }}
          >
            <Typography variant="button">ניהול הזמנות</Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
