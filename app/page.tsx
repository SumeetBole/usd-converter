"use client";

import { useEffect, useState } from "react";

export default function CurrencyConverter() {
  const [currencies, setCurrencies] = useState<Record<string, number>>({});
  const [amount, setAmount] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [conversionDate, setConversionDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(data.usd);
        setConversionDate(data.date);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching currency data:", err);
        setLoading(false);
      });
  }, []);

  const handleConvert = () => {
    if (!amount || !targetCurrency) return;
    const rate = currencies[targetCurrency];
    const result = (parseFloat(amount) * rate).toFixed(2);
    setConvertedAmount(result);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-700 p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-white mb-8 drop-shadow-lg">
          💵 USD Converter
        </h1>

        {loading ? (
          <p className="text-center text-gray-300 animate-pulse">
            Fetching live rates...
          </p>
        ) : (
          <>
            <div className="mb-5">
              <label className="block text-white font-semibold mb-2">
                Amount (USD)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
              />
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">
                Convert To
              </label>
              <select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/20 text-white outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
              >
                <option value="">Select currency</option>
                {Object.keys(currencies).map((currency) => (
                  <option key={currency} value={currency} className="bg-gray-800 text-white">
                    {currency.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleConvert}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transition duration-300 transform hover:scale-105"
            >
              Convert
            </button>

            {convertedAmount && (
              <div className="mt-8 p-5 bg-white/10 backdrop-blur-2xl rounded-2xl text-center shadow-inner">
                <p className="text-xl font-semibold text-white mb-2">
                  {amount} USD = <span className="text-purple-300">{convertedAmount} {targetCurrency.toUpperCase()}</span>
                </p>
                <p className="text-gray-300 text-sm">
                  Conversion Date: {conversionDate}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
