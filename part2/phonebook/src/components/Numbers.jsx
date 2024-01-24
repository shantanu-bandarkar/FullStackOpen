import React from "react";

const Numbers = ({filterPersonsList}) => {
  return (
    <>
      <h2>Numbers</h2>
      {filterPersonsList.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default Numbers;
