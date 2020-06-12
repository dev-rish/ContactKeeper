import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../context/contact/contactContext";

const ContactForm = () => {
  const context = useContext(ContactContext);

  const { addContact, updateContact, current, clearCurrent } = context;

  const initialState = {
    name: "",
    email: "",
    phone: "",
    type: "personal"
  };

  const [contact, setContact] = useState(initialState);

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact(initialState);
    }
  }, [current]);

  const { name, email, phone, type } = contact;

  const onChange = (event) =>
    setContact({
      ...contact,
      [event.target.name]: event.target.value
    });

  const onSubmit = (event) => {
    event.preventDefault();
    if (!current) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
    setContact(initialState);
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Update Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone Number"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <input
        className="btn btn-primary btn-block"
        type="submit"
        value={current ? "Update" : "Add"}
      />
      {current && (
        <button className="btn btn-light btn-block" onClick={() => clearAll()}>
          Clear
        </button>
      )}
    </form>
  );
};

export default ContactForm;
