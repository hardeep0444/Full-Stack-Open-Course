const Person = ({ name, number, removeEntry }) => (
  <div key={name}>
    {name} {number} <button onClick={removeEntry}>delete</button>
  </div>
);
export default Person;
