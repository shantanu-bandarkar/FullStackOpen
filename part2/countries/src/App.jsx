import React, { useEffect, useState } from "react";
import Content from "./Content";
import Filter from "./Filter";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleInput = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setInput(inputValue);

    setFilteredCountries(
      countries.filter((country) => country.toLowerCase().includes(inputValue))
    );
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const countries = response.data.map((country) => country.name.common);
        setCountries(countries);
      });
  }, []);

  return (
    <>
      <Filter input={input} onChange={handleInput} />
      <Content list={filteredCountries} changeFilteredList={handleInput} />
    </>
  );
};

export default App;
