import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../context/contact/contactContext";

const ContactFilter = () => {
  const context = useContext(ContactContext);
  const { filtered, filterContacts, clearFilter } = context;

  const text = useRef("");

  useEffect(() => {
    if (!filtered) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value) {
      filterContacts(e.target.value.trim());
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Search here..."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
