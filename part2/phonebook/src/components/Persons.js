import Person from "./Person";

const Persons = ({ persons, query, removeEntry }) => (
  <div>
    {persons
      .filter((person) => person.name.toLowerCase().includes(query))
      .map(({ name, number, id }) => (
        <Person
          key={id}
          name={name}
          number={number}
          removeEntry={removeEntry(id, name)}
        />
      ))}
  </div>
);
export default Persons;
