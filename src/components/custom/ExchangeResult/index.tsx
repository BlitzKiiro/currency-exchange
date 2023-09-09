interface PropTypes {
  fromAmount: string | null;
  toAmount: string | null;
  fromCurrency: string | null;
  toCurrency: string | null;
  isLoading: boolean;
}

const ExchangeResult = ({
  fromAmount,
  toAmount,
  fromCurrency,
  toCurrency,
  isLoading,
}: PropTypes) => {
  return (
    <div>
      <p>
        {fromAmount} {fromCurrency} equals {isLoading ? "......" : toAmount}{" "}
        {toCurrency}
      </p>
    </div>
  );
};

export default ExchangeResult;
