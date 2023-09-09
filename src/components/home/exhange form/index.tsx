"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import styles from "./styles.module.css";
import NumberInput from "../../custom/NumberInput";
import DropDown from "@/components/custom/DropMenu";
import SwitchButton from "@/components/custom/SwitchButton";
import RoundedButton from "@/components/custom/RoundedButton";
import ExchangeResult from "@/components/custom/ExchangeResult";
import { exchangeCurrencies } from "@/api/CurrencyExchange";

interface PopTypes {
  currenciesQuotes: string[];
}

const ExchangeForm = ({ currenciesQuotes }: PopTypes) => {
  const [amount, setAmount] = useState<string>("1.0");
  const [fromCurrency, setFromCurrency] = useState<string | null>(null);
  const [toCurrency, setToCurrency] = useState<string | null>(null);
  const [exchangeResult, setExchangeResult] = useState<string | null>(null);
  const [isLoadingExchange, setIsLoadingExchange] = useState(false);

  const hasExchange: boolean = useMemo(() => {
    return amount !== "" && fromCurrency !== null && toCurrency !== null;
  }, [amount, fromCurrency, toCurrency]);

  const onSwap = useCallback(() => {
    if (
      amount !== "" &&
      fromCurrency !== null &&
      toCurrency !== null &&
      exchangeResult !== null
    ) {
      const [fromC, toC, fromVal, toVal] = [
        fromCurrency,
        toCurrency,
        amount,
        exchangeResult,
      ];
      setFromCurrency(toC);
      setToCurrency(fromC);
      setAmount(toVal);
      setExchangeResult(fromVal);
    }
  }, [fromCurrency, toCurrency, amount, exchangeResult]);

  const onReset = () => {
    setAmount("1.0");
    setFromCurrency(null);
    setToCurrency(null);
    setExchangeResult("1.0");
  };

  useEffect(() => {
    if (!(amount && fromCurrency && toCurrency)) return;
    setIsLoadingExchange(true);
    const timer = setTimeout(() => {
      exchangeCurrencies({
        from: fromCurrency,
        to: toCurrency,
        quantity: amount,
      }).then((result) => {
        setExchangeResult(result);
        setIsLoadingExchange(false);
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <NumberInput value={amount} onChange={(value) => setAmount(value)} />
        <DropDown
          label='From'
          placeholder='Currency'
          selectedValue={fromCurrency}
          onChange={(value) => setFromCurrency(value)}
          options={currenciesQuotes}
          disabledValues={[toCurrency]}
        />
        <SwitchButton onClick={onSwap} />
        <DropDown
          label='To'
          placeholder='Currency'
          selectedValue={toCurrency}
          onChange={(value) => setToCurrency(value)}
          options={currenciesQuotes}
          disabledValues={[fromCurrency]}
        />
      </div>
      {hasExchange && (
        <>
          <RoundedButton
            label='Reset'
            colors={{ bg: "#37609c", text: "#fff" }}
            onClick={onReset}
          />
          <ExchangeResult
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            fromAmount={amount}
            toAmount={exchangeResult}
            isLoading={isLoadingExchange}
          />
        </>
      )}
    </div>
  );
};

export default ExchangeForm;
