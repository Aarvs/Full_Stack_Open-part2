import { useState, useEffect } from "react";
import axios from "axios";
import Person from "./components/person";
import Filter from "./components/filter";
import PersonForm from "./components/personForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((Response) => {
      console.log("promise fulfilled");
      setPersons(Response.data);
      console.log(Response.data);
    });
  },[]);
  console.log(persons.length, "person");

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
