import { useState, useEffect } from 'react';
import { Filter } from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { Global } from './StyledGlobal';

export const App = () => {
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

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

  const handleAddContacts = newContact => {
    setContacts(prevState => [...prevState, newContact]) ??
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
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
