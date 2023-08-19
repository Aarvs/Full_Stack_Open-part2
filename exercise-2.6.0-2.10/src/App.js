import { useState, useEffect } from "react";
import axios from "axios";
import Person from "./components/person";
import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import userData from "./services/userData";

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
    
    const existingPerson = persons.find((person) => person.name === newName);
  
    if (existingPerson) {
      if (existingPerson.number !== newNumber) {
        const shouldUpdate = window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        );
  
        if (shouldUpdate) {
          const updatedPerson = { ...existingPerson, number: newNumber };
  
          userData
            .update(existingPerson.id, updatedPerson)
            .then(returnNode => {
              setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnNode));
            });
        }
      } else {
        alert(`${newName} is already added to the phonebook with the same number.`);
      }
    } else {
      const person = {
        name: newName,
        number: newNumber,
      };
  
      userData
        .create(person)
        .then(returnNode => {
          setPersons(persons.concat(returnNode));
        });
    }
  
    setNewName("");
    setNewNumber("");
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

  const handleDeletion = id => {
    userData
    .remove(id)
    .then(deleteItem => {
      console.log(deleteItem)
      setPersons(persons.filter(person => person.id !== id))
    })
  }

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
        <Person key={person.id} person={person} handleDeletion={handleDeletion} />
      ))}
    </div>
  );
};

export default App;
