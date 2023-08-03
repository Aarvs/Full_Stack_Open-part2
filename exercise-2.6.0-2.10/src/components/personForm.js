const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleFormChange}>
      <div>
        name: <input value={props.newName} onChange={props.handleNoteChange} />
      </div>

      <div>
        number:{" "}
        <input value={props.newNumber} type="number" onChange={props.handleAddingNumber} />
      </div>

      <div>
        <button type="submit">{props.text}</button>
      </div>
    </form>
  );
};
export default PersonForm
