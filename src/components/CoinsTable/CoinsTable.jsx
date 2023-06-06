import { ThemeProvider } from '@emotion/react';
import {
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { CoinList } from '../../Config/api';
import { themeHeader } from '../../theme/themeHeader';
import { numberWidthCommas } from '../Banner/Carousel';
import './table.scss';

const CoinsTable = () => {
  const [coins, setCoin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const curr = useSelector((state) => state.cur.exchangeArr);
  const symbolDoll = useSelector((state) => state.cur.doll);

  const fetchCoins = async () => {
    setLoading(true);
    const datacur = JSON.parse(localStorage.getItem('datacur'));

    if (!datacur) {
      const { data } = await axios.get(
        coins.length > 0 ? CoinList(curr.currency) : CoinList('USD')
      );

      localStorage.setItem('datacur', JSON.stringify(data));
      setCoin(data);
      setLoading(false);
    } else {
      setCoin(datacur);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const handleSearch = () => {
    return coins?.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <ThemeProvider theme={themeHeader}>
      <Container style={{ textAlign: 'center' }}>
        <Typography variant="h4" className="coins-table">
          Crypto Currency Prices by Marcet Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency ..."
          variant="outlined"
          style={{ marginBottom: 20, width: '100%' }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: 'gold' }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                <TableRow>
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                    <TableCell
                      style={{
                        color: 'black',
                        fontWeight: '700',
                      }}
                      key={head}
                      align={head === 'Coin' ? '' : 'right'}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        className="coins-tablerow"
                        key={row.name}
                        component={Link}
                        to={`/coins/${row.id}`}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ display: 'flex', gap: 15 }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                          >
                            <span
                              style={{
                                textTransform: 'uppercase',
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: 'darkgrey' }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {curr.symbol ? curr.symbol : symbolDoll}{' '}
                          {numberWidthCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                            fontWeight: 500,
                          }}
                        >
                          {profit && '+'}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {curr.symbol ? curr.symbol : symbolDoll}{' '}
                          {numberWidthCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}{' '}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          className="coins-pagination"
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 520);
          }}
        >
          {' '}
        </Pagination>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
