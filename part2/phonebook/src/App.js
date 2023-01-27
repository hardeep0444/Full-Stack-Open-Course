import { useState, useEffect } from "react";
// import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setNewFilter] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    phonebookService.getAll().then((initialData) => setPersons(initialData));
  }, []);

  //during first render useEffect doesn't run hence persons are null and there if not given this condition then it throws an error "Cannot read properties of null (reading 'map')"
  if (!persons) return null;

  const addPerson = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber,
    };

    const foundName = persons.find((person) => person.name === newName);

    if (foundName) {
      if (
        window.confirm(
          `${newName} is already added in the phonebook, replace the old number with a new one? `
        )
      ) {
        phonebookService
          .update(foundName.id, nameObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== foundName.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");

            setStatus("success");
            setMessage(`Updated ${returnedPerson.name}`);
            setTimeout(() => {
              setStatus("");
              setMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setStatus("error");
            setMessage(
              `Information of ${foundName.name} has already been removed from server`
            );
            setTimeout(() => {
              setStatus("");
              setMessage(null);
            }, 5000);

            setNewName("");
            setNewNumber("");
            setPersons(persons.filter((p) => p.id !== foundName.id));
          });
      }
    } else {
      phonebookService.create(nameObject).then((returnedData) => {
        setPersons(persons.concat(returnedData));

        setStatus("success");
        setMessage(`Added ${returnedData.name}`);
        setTimeout(() => {
          setStatus("");
          setMessage(null);
        }, 3000);

        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleChange = (setValue) => (event) => setValue(event.target.value);

  const handleDelete = (id, name) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.name !== name));
        })
        .catch((error) => {
          setStatus("error");
          setMessage(
            `Information of ${name} has already been removed from server`
          );
          setTimeout(() => {
            setStatus("");
            setMessage(null);
          }, 5000);
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} status={status} />
      <Filter query={filterQuery} handleChange={handleChange(setNewFilter)} />
      <h3>add a new</h3>
      <PersonForm
        handleAddPerson={addPerson}
        name={newName}
        number={newNumber}
        handleChangeName={handleChange(setNewName)}
        handleChangeNumber={handleChange(setNewNumber)}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        query={filterQuery}
        removeEntry={handleDelete}
      />
    </div>
  );
};

export default App;
