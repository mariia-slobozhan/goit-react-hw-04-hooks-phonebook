import "./App.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import PhonebookForm from "./Components/PhonebookForm/PhonebookForm";
import ContactList from "./Components/ContactsList/ContactsList";
import Filter from "./Components/Filter/Filter";

const contactsList = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

const useLocaleStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default function App() {
  const [contacts, setContacts] = useLocaleStorage("contacts", contactsList);
  const [filter, setFilter] = useState("");

  const addNewContact = (contact) => {
    const normalizedContact = contact.name.toLowerCase();
    if (contacts.some((el) => el.name.toLowerCase() === normalizedContact)) {
      alert(`${contact.name} is already in contact list`);
      return;
    }
    setContacts((prevState) => [...prevState, { ...contact, id: uuidv4() }]);
  };

  const changeFilter = (e) => {
    setFilter(e.target.value);
  };

  const getVisiableContacts = () => {
    const normalizedContacts = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedContacts)
    );
  };

  const deleteContact = (contactId) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== contactId)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <PhonebookForm list={contacts} addNewContact={addNewContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        items={getVisiableContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
