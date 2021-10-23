import React from "react";
import ContactItem from "../ContactItem/ContactItem";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

export default function ContactList({ items, onDeleteContact }) {
  return (
    <ul>
      {items.map((item) => (
        <ContactItem
          key={uuidv4()}
          id={item.id}
          name={item.name}
          tel={item.number}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  onDeleteContact: PropTypes.func,
};
