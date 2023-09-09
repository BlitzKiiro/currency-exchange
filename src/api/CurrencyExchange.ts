import axios from "axios";

const getCurrenciesQuotes = async (): Promise<string[]> => {
  const options = {
    method: "GET",
    url: "https://currency-exchange.p.rapidapi.com/listquotes",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const exchangeCurrencies = async (query: {
  from: string;
  to: string;
  quantity: string;
}): Promise<string | null> => {
  const options = {
    method: "GET",
    url: "https://currency-exchange.p.rapidapi.com/exchange",
    params: {
      from: query.from,
      to: query.to,
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return (response.data * Number(query.quantity)).toString();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getCurrenciesQuotes, exchangeCurrencies };
