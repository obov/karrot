import { Suspense } from "react";
const cache: any = {};
function fetchData(url: string) {
  if (!cache[url]) {
    throw fetch(url)
      .then((r) => r.json())
      .then((json) => (cache[url] = json.slice(0, 50)));
    throw Promise.all([
      fetch(url)
        .then((r) => r.json())
        .then((json) => (cache[url] = json)),
      new Promise((resolve) =>
        setTimeout(resolve, Math.round(Math.random() * 10555))
      ),
    ]);
  }
  return cache[url];
}

function Coin({ id, name, symbol }: any) {
  const {
    quotes: {
      USD: { price },
    },
  } = fetchData(`https://api.coinpaprika.com/v1/tickers/${id}`);
  return (
    <span>
      {name} / {symbol}: ${price}
    </span>
  );
}

function List() {
  const coins = fetchData("https://api.coinpaprika.com/v1/coins");
  console.log(coins);
  return (
    <>
      <ul>
        {coins.map((coin: any) => (
          <li key={coin.id}>
            {coin.name} / {coin.symbol}
          </li>
        ))}
      </ul>
      <div>
        <h4>List is done</h4>
        <ul>
          {coins.slice(0, 10).map((coin: any) => (
            <li key={coin.id}>
              <Suspense fallback={`Coin ${coin.name} is loading`}>
                <Coin {...coin} />
              </Suspense>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
