import ExchangeForm from "@/components/home/exhange form";
import { getCurrenciesQuotes } from "@/api/CurrencyExchange";

export default async function Home() {
  const currenciesQuotes = await getCurrenciesQuotes();

  return (
    <main className='main-container'>
      <h1 className='main-label'> Money Exchange</h1>
      <ExchangeForm currenciesQuotes={currenciesQuotes} />
    </main>
  );
}
