import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../Config/api';
import CoinInfo from '../components/CoinInfo/CoinInfo';
import { styled, ThemeProvider } from '@mui/system';
import { theme } from './theme';
import { LinearProgress, Typography } from '@mui/material';
import { numberWidthCommas } from '../components/Banner/Carousel';
import './style.scss';

const Responsive = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('laptop')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  color: '#fff',
}));

const Sidebar = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '30%',
  [theme.breakpoints.down('laptop')]: {
    width: '100%',
  },
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 25,
  borderRight: '2px solid grey',
}));
const Namecoin = styled('div')(() => ({
  fontWeight: '600',
  marginBottom: 20,
  fontFamily: '"Segoe UI"',
}));

const Desc = styled('div')(() => ({
  width: '100%',
  padding: 25,
  fontSize: 18,
  paddingBottom: 15,
  paddingTop: 0,
  fontFamily: '"Segoe UI"',
  textAlign: 'justify',
}));

const MarketData = styled('div')(({ theme }) => ({
  alignSelf: 'start',
  padding: 25,
  paddingTop: 10,
  width: '100%',
  [theme.breakpoints.down('desktop')]: {
    alignItems: 'start',
  },
  [theme.breakpoints.down('laptop')]: {
    display: 'flex',
    flex: 'content',
    justifyContent: 'space-around',
  },
  [theme.breakpoints.down('tablet')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Heading = styled('div')(() => ({}));

const CoinPages = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [w, setW] = useState(window.innerWidth);
  const curr = useSelector((state) => state.cur.exchangeArr);
  const symbolDoll = useSelector((state) => state.cur.doll);

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setW(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: 'gold' }} />;

  return (
    <ThemeProvider theme={theme}>
      <Responsive>
        <Sidebar>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200px"
            style={{ mrginBottom: 20 }}
          />
          <Namecoin>
            <Typography variant="h3" style={{ fontFamily: 'Jost' }}>{coin?.name}</Typography>
          </Namecoin>
          <Desc>
            <Typography variant="subtitle">
              {coin?.description.en.split('. ')[0]}.
            </Typography>
          </Desc>
          <MarketData>
            <span style={{ display: 'flex' }}>
              <Heading>
                <Typography variant="h5" style={{ fontFamily: 'Jost' }}>Rank:</Typography>
              </Heading>
              &nbsp;&nbsp;
              <Typography variant="h5" >
                {coin?.market_cap_rank}
              </Typography>
            </span>
            <span style={{ display: 'flex' }}>
              <Heading>
                <Typography variant="h5" style={{ fontFamily: 'Jost' }}>Current Price:</Typography>
              </Heading>
              &nbsp;&nbsp;
              <Typography variant="h5" style={{ fontFamily: '' }}>
                {curr.symbol ? curr.symbol : symbolDoll}{' '}
                {numberWidthCommas(
                  coin.market_data.current_price[
                    (curr.currency ? curr.currency : 'USD').toLowerCase()
                  ]
                )}
              </Typography>
            </span>
            <span style={{ display: 'flex', height: "25"}}>
              <Heading>
                <Typography variant="h5" style={{ fontFamily: 'Jost' }}>Market Cap:</Typography>
              </Heading>
              &nbsp;&nbsp;
              <Typography variant="h5" style={{ fontFamily: '' }}>
                {curr.symbol ? curr.symbol : symbolDoll}{' '}
                {numberWidthCommas(
                  coin.market_data.market_cap[
                    (curr.currency ? curr.currency : 'USD').toLowerCase()
                  ]
                    .toString()
                    .slice(0, -6)
                )}
              </Typography>
            </span>
          </MarketData>
        </Sidebar>
        <CoinInfo coin={coin} />
      </Responsive>
    </ThemeProvider>
  );
};

export default CoinPages;
