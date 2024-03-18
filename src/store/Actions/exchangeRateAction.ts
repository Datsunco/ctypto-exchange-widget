import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface respExchngeRateApi {
    data: {
        currency: string,
        rates: {
            [key: string]: string
        }
    }
}

export const fetchExchangeRate = createAsyncThunk(
    'rate/fetchCurrent',
    async (_, thunkAPI) => {
        try {
            const resp = await axios.get<respExchngeRateApi>("https://api.coinbase.com/v2/exchange-rates")
            return {
                'USDT': 1,
                'BTC': 1 / Number(resp.data.data.rates['BTC']),
                'ETH': 1 / Number(resp.data.data.rates['ETH']),
            }
        } catch (e) {
            return thunkAPI.rejectWithValue("Произошла непредвиденная ошибка")
        }
    }
)