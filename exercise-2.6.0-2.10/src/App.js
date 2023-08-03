import { useState } from "react";
import Person from "./components/person";
import Filter from "./components/filter";
import PersonForm from "./components/personForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFormChange = (event) => {
    event.preventDefault();

    const nameExists = persons.some((person) => person.name === newName);
    console.log(nameExists);
    if (newName === "" || newNumber === "") {
      alert("fill out your fields properly");
    } else if (nameExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const person = {
        name: newName,
        id: newName,
        number: newNumber,
      };
      setPersons(persons.concat(person));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleAddingNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchTerm} onChange={handleSearchChange} />
      <h3>add a new name</h3>
      <PersonForm
        handleFormChange={handleFormChange}
        handleNoteChange={handleNoteChange}
        handleAddingNumber={handleAddingNumber}
        newName={newName}
        newNumber={newNumber}
        text="add"
      />
      <div>debug: {newName}</div>
      <h2>Numbers</h2>

      {filteredPersons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;
