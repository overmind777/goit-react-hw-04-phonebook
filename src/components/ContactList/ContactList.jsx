import { StyledContactList, StyledButton } from './StyledContactList';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <StyledContactList>
      {contacts?.map((contact, idx) => (
        <li key={idx}>
          {contact.name}: {contact.number}
          <StyledButton onClick={() => onDeleteContact(contact.id)}>
            Delete
          </StyledButton>
        </li>
      ))}
    </StyledContactList>
  );
};

export default ContactList;
