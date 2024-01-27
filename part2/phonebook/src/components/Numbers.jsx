import React from "react";

const Numbers = ({ filterPersonsList, refreshList}) => {

  return (
    <>
      <h2>Numbers</h2>
      {filterPersonsList.map((person) => (
        <div key={person.name}>
          <p>
            {person.name} {person.number}
          </p>
          <button onClick={() => refreshList(person.id, person.name)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Numbers;
