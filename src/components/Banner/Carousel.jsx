import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TrendingCoins } from '../../Config/api';
import AliceCarousel from 'react-alice-carousel';
import { NavLink } from 'react-router-dom';

export const numberWidthCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const curr = useSelector((state) => state.cur.exchangeArr);
  const [symb] = useState(curr.symbol)

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(
      trending.length > 0 ? TrendingCoins(curr.currency) : TrendingCoins('USD')
    );
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [curr]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items = trending?.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <div>
        <NavLink className="carousel-items" to={`coins/${coin.id}`}>
          <img src={coin.image} alt={coin.name} className="carousel-img" />
          <span className="carousel-name-currency">
            {coin.symbol}
            &nbsp;
            <span className={profit > 0 ? 'profit-long' : 'profit-short'}>
              {profit && '+'}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </span>
          <span className='carousel-symbol'>
          {curr.symbol ? curr.symbol : '$'} {numberWidthCommas(coin.current_price.toFixed(2))}
          </span>
        </NavLink>
      </div>
    );
  });

  return (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
