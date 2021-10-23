import "./App.css";
import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import PhonebookForm from "./Components/PhonebookForm/PhonebookForm";
import ContactList from "./Components/ContactsList/ContactsList";
import Filter from "./Components/Filter/Filter";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addNewContact = (contact) => {
    this.setState((prevState) => {
      const normalizedContact = contact.name.toLowerCase();
      return prevState.contacts.some(
        (el) => el.name.toLowerCase() === normalizedContact
      )
        ? alert(`${contact.name} is already in contact list`)
        : { contacts: [...prevState.contacts, { ...contact, id: uuidv4() }] };
    });
  };

  changeFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  getVisiableContacts = () => {
    const normalizedContacts = this.state.filter.toLowerCase();
    return this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedContacts)
    );
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const visiableContacts = this.getVisiableContacts();
    const { contacts } = this.state;
    const { addNewContact, changeFilter, deleteContact } = this;

    return (
      <div>
        <h1>Phonebook</h1>
        <PhonebookForm list={contacts} addNewContact={addNewContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={changeFilter} />
        <ContactList items={visiableContacts} onDeleteContact={deleteContact} />
      </div>
    );
  }
}
