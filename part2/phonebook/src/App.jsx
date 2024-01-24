import { useState } from "react";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

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
