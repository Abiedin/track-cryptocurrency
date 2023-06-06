import { createTheme } from '@mui/material';

export const themeHeader = createTheme({
  palette: {
    mode: 'dark',
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
