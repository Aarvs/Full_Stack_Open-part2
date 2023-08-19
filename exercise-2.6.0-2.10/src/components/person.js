const Person = ({person, handleDeletion}) =>{
    return(
        <div>{person.name} {person.number} <button onClick={() => handleDeletion(person.id)}>delete</button></div>
    )
}
export default Person;