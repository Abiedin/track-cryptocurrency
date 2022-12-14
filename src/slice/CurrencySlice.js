import { createSlice } from '@reduxjs/toolkit'; 

const CurrencySlice = createSlice({
  name: 'exchange',
  initialState: {
    exchangeArr: [],
    doll: '$',
    status: null,
    error: null,
  },
  reducers: {
    stateCurrency: (state, action) => {
      state.exchangeArr = action.payload;
    },
  },
});

export const { stateCurrency } = CurrencySlice.actions;

export default CurrencySlice.reducer;
