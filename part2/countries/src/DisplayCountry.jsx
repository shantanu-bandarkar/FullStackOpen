import React, { useState, useEffect } from "react";
import axios from "axios";
const DisplayCountry = ({ country }) => {
  const [details, setDetails] = useState(null);
 
  useEffect(()=>{axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
    .then((response) => {
      setDetails(response.data);
    });},[country])
    if(!details) return null;
  console.log("DisplayDetails", details);
  return (
    <>
      <h1>{country}</h1>
      <div>Capital:{details.capital}</div>
      <div>area:{details.area}</div>
      <div>languages: {Object.entries(details.languages).map(ln => <ul key={ln[0]}>{ln[1]}</ul>)}</div>
      <img src={details.flags.png} alt={details.flags.alt}/>
    </>
  );
};

export default DisplayCountry;
