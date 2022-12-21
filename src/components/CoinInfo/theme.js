import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primery: {
      main: "#fff",
    },
    type: 'dark',
  },
  breakpoints: {
    value: {
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1200,
    },
  },
});
