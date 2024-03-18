import { useAppDispath, useAppSelector } from "@/hooks/redux";
import { Combobox } from "../ui/ComboBox";
import { Input } from "../ui/input";
import { setCurrencyFrom, setCurrencyTo, setAmountFrom, setAmountTo, calculateExchange } from "@/store/Slicers/exchangeSlicer";
import { fetchExchangeRate } from "@/store/Actions/exchangeRateAction";
import { ArrowRightLeft } from 'lucide-react'
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";


const Exchange = () => {
    const { currencyFrom, currencyTo, amountFrom, amountTo, isLoadning } = useAppSelector(state => state.exchangeSlicer)
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
                <div className="flex row rounded-l-xl gap-[5px] items-center">
                    <div className="flex row">
                        <Input value={amountFrom} onChange={(e) => dispath(setAmountFrom(e.target.value))} className="w-[150px] h-[45px] rounded-none rounded-l-lg text-right" />
                        <Combobox initValue={currencyFrom} onSelectValue={(e) => dispath(setCurrencyFrom(e))} />
                    </div>
                    <ArrowRightLeft className="w-[18px] h-[18px]" />
                    <div className="flex row">
                        <Input value={amountTo} onChange={(e) => dispath(setAmountTo(e.target.value))} className="w-[150px] h-[45px] rounded-none rounded-l-lg text-right" />
                        <Combobox initValue={currencyTo} onSelectValue={(e) => dispath(setCurrencyTo(e))} />
                    </div>
                </div>
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