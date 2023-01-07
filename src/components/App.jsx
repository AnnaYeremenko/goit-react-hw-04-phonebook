import React, { useState, useEffect, useRef } from "react";
import { nanoid } from 'nanoid';
import {ContactForm} from './ContactForm/ContactForm';
import {ContactList} from './ContactList/ContactList';
import {Filter} from './Filter/Filter';
import {Title, ContactsTitle} from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState([
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '691-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]);
  const [filter, setFilter] = useState('');
  
   const isFirstRender = useRef(true);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contactsList');

    if (savedContacts !== null) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('contactsList', JSON.stringify(contacts));
  }, [contacts]);

   const addContact = (name, number) => {

    const searchName = contacts.find(
      contact => contact.name.toLocaleLowerCase().trim() === name.toLocaleLowerCase()
    );
    if (searchName) {
      return alert(`${name} is alredy in contacts`);
    }
    setContacts(prevContacts => [
      ...prevContacts, 
      {id: nanoid(), name, number},
    ]);
  };

  const changeFilter = evt => {
    const filter = evt.target.value;
    setFilter(filter);
  };

  const getVizibleContact = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
      );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts => 
      prevContacts.filter(contact => contact.id !== contactId),
    );
  };

    return (
      <Title>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

      <ContactsTitle>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        {contacts.length > 0 && (
          <ContactList
            contacts={getVizibleContact()}
            onDelete={deleteContact}
          />
        )}
        </ContactsTitle>
      </Title>
    );
  };

