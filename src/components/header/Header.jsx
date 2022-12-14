import React, { useState } from 'react';
import { AppBar, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import './header.scss';
import { Container } from '@mui/system';
import { NavLink } from 'react-router-dom';
import { themeHeader } from '../../theme/themeHeader';
import { stateCurrency } from '../../slice/CurrencySlice';
import { useDispatch } from 'react-redux';

const Header = () => {
  const [currency, setCurrency] = useState('USD');
 
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={themeHeader}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography variant="h5" className="header-typography">
              <NavLink to="/" className="header-logo">
                Crypto Hunter
              </NavLink>
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 35,
                marginLeft: 15,
              }}
              value={currency}
            >
              <MenuItem
                value="USD"
                onClick={() => {
                  dispatch(stateCurrency({ currency : 'USD', symbol : '$'}));
                  setCurrency('USD');
                }}
              >
                USD
              </MenuItem>
              <MenuItem
                value="JPY"
                onClick={() => {
                  dispatch(stateCurrency({ currency : 'JPY', symbol : '¥'}));
                  setCurrency('JPY');
                }}
              >
               JPY
              </MenuItem>
              
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
