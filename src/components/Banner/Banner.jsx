import { Container, Typography } from '@mui/material';
import React from 'react';
import './banner.scss';
import Carousel from './Carousel';

const Banner = () => {
  return (
    <div className="banner">
      <Container className="banner__conteiner">
        <div className="tagline">
          <Typography variant="h2" className="banner__typography">
            Crypto Hunter
          </Typography>
          <Typography variant="subtitle2" className="banner__subtitle">
            Get All The Info Regarding Your Favorite Cripto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
