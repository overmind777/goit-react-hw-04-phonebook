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

ContactList.PropTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
