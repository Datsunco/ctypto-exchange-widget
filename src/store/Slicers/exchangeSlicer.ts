import { createSlice } from '@reduxjs/toolkit';
import { fetchExchangeRate } from '../Actions/exchangeRateAction';

interface exchangeType{
    currencies: string[],
    exchangeRates: {
        [key: string]: number
    },
    currencyFrom: string,
    currencyTo: string,
    amountFrom: number,
    amountTo: number,
    error: string,
    isLoadning: boolean,
}

const initialState: exchangeType = {
  currencies: ['USDT', 'BTC', 'ETH'],
  exchangeRates: {
    USDT: 1,
    BTC: 1000,
    ETH: 100,
  },
  currencyFrom: 'USDT',
  currencyTo: 'BTC',
  amountFrom: 0,
  amountTo: 0,
  error: '',
  isLoadning: false
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    setCurrencyFrom: (state, action) => {
       state.currencyFrom = action.payload;
    },
    setCurrencyTo: (state, action) => {
        // console.log(action)
      state.currencyTo = action.payload;
    },
    setAmountFrom: (state, action) => {
      state.amountFrom = action.payload;
    },
    setAmountTo: (state, action) => {
      state.amountTo = action.payload;
    },
    calculateExchange: (state) => {
      const rateFrom = state.exchangeRates[state.currencyFrom];
      const rateTo = state.exchangeRates[state.currencyTo];
      const convertedAmount = (state.amountFrom * rateFrom) / rateTo;
      state.amountTo = convertedAmount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.isLoadning = false
        state.exchangeRates = action.payload
    }),
    builder.addCase(fetchExchangeRate.pending, (state) => {
        state.isLoadning = true
    }),
    builder.addCase(fetchExchangeRate.rejected, (state, action) => {
        state.isLoadning = false
        state.error = action.payload as string
    })
  }
});

export const { setCurrencyFrom, setCurrencyTo, setAmountFrom, setAmountTo, calculateExchange } = exchangeSlice.actions;
export default exchangeSlice.reducer;