import { nanoid } from 'nanoid';
import { StyledContactForm, StyledButton } from './StyledContactForm';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ContactForm = ({ contacts, handleAddContacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleOnSubmit = e => {
    e.preventDefault();
    const isNameExists = contacts.some(contact => contact.name === name);
    if (isNameExists) {
      alert(`${name} is already in contacts`);
      return;
    }
    handleAddContacts({ id: nanoid(), name, number });
    setName('');
    setNumber('');
  };

  const handleNameInputChange = e => {
    setName(e.target.value);
  };
  const handleNumberInputChange = e => {
    setNumber(e.target.value);
  };

  return (
    <>
      <StyledContactForm onSubmit={handleOnSubmit}>
        <label htmlFor="nameContact">Name</label>
        <input
          type="text"
          name="name"
          id="nameContact"
          value={name}
          required
          autoFocus
          placeholder="Enter name"
          onChange={handleNameInputChange}
        />

        <label htmlFor="phoneContact">Phone</label>
        <input
          type="tel"
          name="number"
          id="phoneContact"
          value={number}
          required
          placeholder="Enter phone"
          onChange={handleNumberInputChange}
        />

        <StyledButton type="submit">Add contact</StyledButton>
      </StyledContactForm>
    </>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  handleAddContacts: PropTypes.func.isRequired,
};

export default ContactForm;
