import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import PersonForm from "./components/PersonForm";
import persons_service from "./services/persons_service";
import Message from "./components/Message";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState("green");
  useEffect(() => {
    persons_service.getAll().then((list) => {
      setPersons(list);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleRemove = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      persons_service.remove(id).then(() => {
        setPersons((prevPersons) => prevPersons.filter((p) => p.id !== id));
      });
    }
  };
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const findDupID = (name) => {
    const index = persons.findIndex((p) => p.name === name);
    return index !== -1 ? persons[index].id : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((newName == "") | (newNumber == "")) {
      alert("please fill in the required details");
    } else if (findDupID(newName)) {
      // console.log('dup user found',newName);
      const dupPersonID = findDupID(newName);
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace the old number with new number?`
        )
      ) {
        const updatedObj = {
          name: newName,
          number: newNumber,
          id: dupPersonID,
        };
        persons_service
          .updateNum(dupPersonID, updatedObj)
          .then((returned) =>
            setPersons(persons.map((p) => (p.id != dupPersonID ? p : returned)))
          )
          .catch((e) => {
            setMessage(e.response.data.error),
              setColor("red");
            setTimeout(() => setMessage(null), 3000);
          });
      }
      setNewName("");
      setNewNumber("");
      return; // Add a return statement to stop further execution
    } else {
      const newObj = {
        name: newName,
        number: newNumber,
        id: (persons.length + 1).toString(),
      };
      persons_service
        .create(newObj)
        .then((result) => {
          setPersons(persons.concat(result)),
            setMessage(`Added ${result.name}`),
            setColor("green"),
            setTimeout(() => setMessage(null), 3000);
        })
        .catch(
          (e) => setMessage(e.response.data.error),
          setColor("red"),
          setTimeout(() => setMessage(null), 3000)
        );
    }

    setNewName("");
    setNewNumber("");
    setSearch("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Message msg={message} msgColor={color} />
      <Filter value={search} onChange={handleSearchChange} />
      <PersonForm
        ipName={newName}
        onNameChange={handleNameChange}
        ipNum={newNumber}
        onNumChange={handleNumberChange}
        onFormSubmit={handleSubmit}
      />
      {filteredPersons && (
        <Numbers
          filterPersonsList={filteredPersons}
          refreshList={handleRemove}
        />
      )}
    </div>
  );
};

export default App;
