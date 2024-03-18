import { useAppDispath, useAppSelector } from "@/hooks/redux";
import { Combobox } from "../ui/ComboBox";
import { Input } from "../ui/input";
import { setCurrencyFrom, setCurrencyTo, setAmountFrom, setAmountTo, calculateExchange, swapCurrency } from "@/store/Slicers/exchangeSlicer";
import { fetchExchangeRate } from "@/store/Actions/exchangeRateAction";
import { ArrowRightLeft } from 'lucide-react'
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ComboboxTo } from "./ComboBoxTo";


const Exchange = () => {
    const { currencyFrom, currencyTo, amountFrom, amountTo, isLoadning, exchangeRates} = useAppSelector(state => state.exchangeSlicer)
    const dispath = useAppDispath()

    useEffect(() => {
        if (amountFrom !== 0)
            dispath(calculateExchange())
    }, [amountFrom, currencyFrom, currencyTo])

    useEffect(() => {
        dispath(fetchExchangeRate())
    }, [])


    return (
        <>
            {!isLoadning ?
                <Card>
                    <CardHeader>
                    <div className="flex row gap-[5px] items-center">
                        <div className="flex row">
                            <Input value={amountFrom} onChange={(e) => dispath(setAmountFrom(e.target.value))} className="w-[150px] h-[45px] rounded-none rounded-l-lg text-right text-md font-medium" />
                            <Combobox status="from" initValue={currencyFrom} onSelectValue={(e) => dispath(setCurrencyFrom(e))} />
                        </div>
                        <ArrowRightLeft className="w-[17px] h-[17px] text-slate-500" onClick={() => dispath(swapCurrency())}/>
                        <div className="flex row">
                            <Input disabled={true} value={amountTo} onChange={(e) => dispath(setAmountTo(e.target.value))} className="w-[150px] h-[45px] rounded-none rounded-l-lg text-right text-md font-medium" />
                            <ComboboxTo status="to" initValue={currencyTo} onSelectValue={(e) => dispath(setCurrencyTo(e))} />
                        </div>
                    </div>
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-md"> 1 {currencyFrom} = {exchangeRates[currencyFrom] / exchangeRates[currencyTo]} {currencyTo}</CardTitle>
                        <CardDescription className="text-xs font-medium text-slate-500">Данные носят ознакомительный характер</CardDescription>
                    </CardContent>
                </Card>
                :
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            }

        </>
    );
};

export default Exchange;