import React, { useEffect, useState } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [rates, setRates] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [fromValue, setFromValue] = useState(0);
  const [toCurrency, setToCurrency] = useState("USD");
  const [toValue, setToValue] = useState(1);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((json) => {
        setRates(json.rates);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    if (value > 0) {
      const price = value / rates[fromCurrency];
      const result = price * rates[toCurrency];
      setToValue(result.toFixed(3));
      setFromValue(value);
    }
  };

  const onChangeToPrice = (value) => {
    if (value > 0) {
      const result = (rates[fromCurrency] / rates[toCurrency]) * value;
      setFromValue(result.toFixed(3));
      setToValue(value);
    }
  };

  useEffect(() => {
    onChangeToPrice(1);
  }, [rates]);

  useEffect(() => {
    onChangeFromPrice(fromValue);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toValue);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromValue}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toValue}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
