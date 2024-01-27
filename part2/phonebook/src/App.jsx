import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import PersonForm from "./components/PersonForm";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log('useEffect exec');
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);
  console.log('out useEffect');

  const checkUserExists = (user) => {
    const dup = persons.find((person) => person.name === user);
    return dup !== undefined && dup.name === user;
  };

  const handleNameChange = (e) => {
    // console.log(e.target.value);
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );
  // console.log(filteredPersons);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(checkUserExists(e.target.value));
    if ((newName == "") | (newNumber == "")) {
      alert("please fill in the required details");
    } else if (checkUserExists(newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return; // Add a return statement to stop further execution
    } else {
      // console.log("AAA");
      const newObj = {
        name: newName,
        number: newNumber,
      };
      setPersons([...persons, newObj]);
    }

    setNewName("");
    setNewNumber("");
    setSearch("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleSearchChange} />
      <PersonForm
        ipName={newName}
        onNameChange={handleNameChange}
        ipNum={newNumber}
        onNumChange={handleNumberChange}
        onFormSubmit={handleSubmit}
      />
      {filteredPersons && <Numbers filterPersonsList={filteredPersons} />}
    </div>
  );
};

export default App;
