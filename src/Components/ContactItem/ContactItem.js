import React from "react";
import PropTypes from "prop-types";
import s from "./ContactItem.module.css";

export default function ContactItem({ name, tel, id, onDeleteContact }) {
  return (
    <li className={s.item} id={id}>
      <span className={s.name}>{name}</span>
      <span className={s.tel}>{tel}</span>
      <button
        className={s.button}
        onClick={() => onDeleteContact(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string,
  tel: PropTypes.string,
  id: PropTypes.string,
  onDeleteContact: PropTypes.func,
};
