import React, { useContext } from "react";
import PropTypes from "prop-types";

import ConatctContext from "../context/contact/contactContext";

const ContactItem = ({ contact }) => {
  const context = useContext(ConatctContext);
  const { setCurrent, clearCurrent, deleteContact } = context;

  const { _id, name, email, phone, type } = contact;

  const badgeClass = `badge ${
    type === "professional" ? "badge-success" : "badge-primary"
  }`;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span style={{ float: "right" }} className={badgeClass}>
          {type[0].toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open" /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone" /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.prototypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
