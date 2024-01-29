import { React } from "react";
import DisplayCountry from "./DisplayCountry";
const Content = ({ list, changeFilteredList }) => {
  const handleClick = (e) => {
    // console.log('event',e.target);
    changeFilteredList(e);
  };
  if (list.length === 0) {
    return <p>Empty List</p>;
  } else if (list.length > 10) {
    return <p>Too much matches, specify another filter</p>;
  } else if (list.length == 1) {
    return <DisplayCountry country={list[0]} />;
  } else {
    return list.map((country) => (
      <div key={country}>
        <ul>
          {country}{" "}
          <button value={country} onClick={handleClick}>
            show
          </button>
        </ul>
      </div>
    ));
  }
};

export default Content;
