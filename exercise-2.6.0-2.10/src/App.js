import { useState } from "react";
import Person from "./components/person";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas",id: "Arto Hellas"}]);
  const [newName, setNewName] = useState("");

  const handleFormChange = (event) => {
    const nameExists = persons.some(person => person.name === newName)
    console.log(nameExists)
    event.preventDefault()
    if(nameExists){
      alert(`${newName} is already added to phonebook`)
    }else{
      const person = {
        name: newName,
        id: newName,
      };
      setPersons(persons.concat(person));
      setNewName("");
    }
    
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormChange}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      
      {persons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;
