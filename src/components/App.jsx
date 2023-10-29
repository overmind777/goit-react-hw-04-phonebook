import { useState, useEffect } from 'react';
import { Filter } from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { Global } from './StyledGlobal';

export const App = () => {
  const [contacts, setContacts] = useState(
    [] ?? JSON.parse(window.localStorage.getItem('contacts'))
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = JSON.parse(window.localStorage.getItem('contacts'));

    if (storedContacts) {
      setContacts(storedContacts);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContacts = newContact => {
    setContacts(prevState => [...prevState, newContact]);
  };

  const handleOnFindInputChange = e => {
    setFilter(e.target.value.toLowerCase().trim());
  };

  const getVisibleContacts = () => {
    return contacts?.filter(contact => {
      return contact.name.toLowerCase().trim().includes(filter);
    });
  };

  const handleClickDelete = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
    setFilter('');
  };

  return (
    <Global>
      <h1>Phonebook</h1>
      <ContactForm handleAddContacts={handleAddContacts} contacts={contacts} />

      <h2>Contacts</h2>
      <Filter
        value={filter}
        handleOnFindInputChange={handleOnFindInputChange}
      />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={handleClickDelete}
      />
    </Global>
  );
};
