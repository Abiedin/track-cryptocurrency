import { CircularProgress } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { HistoricalChart } from '../../Config/api';
import { theme } from './theme';
import SelectButton from '../SelectButton';
import { chartDays } from '../../Config/data';

const Container = styled('div')(({ theme }) => ({
  width: '75%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 25,
  padding: 40,
  [theme.breakpoints.down('desktop')]: {
    width: '100%',
    marginTop: 0,
    padding: 20,
    paddingTop: 0,
    border: '3px solid re',
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

const CoinInfo = ({ coin }) => {
  const [historicDate, setHistoricDate] = useState();
  const [days, setDays] = useState(1);
  const curr = useSelector((state) => state.cur.exchangeArr);
  const symbolDoll = useSelector((state) => state.cur.doll);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(
      HistoricalChart(coin.id, days, curr.currency ? curr.currency : 'USD')
    );

    setHistoricDate(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {!historicDate ? (
          <CircularProgress
            style={{ color: 'gold' }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
         
            <Bar
              data={{
                labels: historicDate.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicDate.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${
                      curr.currency ? curr.currency : 'USD'
                    }`,
                    borderColor: '#EEBC1D',
                  },
                ],
               
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <>
              <div
                style={{
                  display: 'flex',
                  marginTop: 20,
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                {chartDays.map((day) => (
                  <SelectButton
                    key={day.value}
                    onClick={() => setDays(day.value)}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                ))}
              </div>
            </>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default CoinInfo;
