import React, { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import ContactContext from "../context/contact/contactContext";
import ContactItem from "./ContactItem";
import { useEffect } from "react";
import Spinner from "../layouts/Spinner";

const Contact = () => {
  const context = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = context;

  useEffect(() => {
    getContacts();
  }, []);

  if (loading) return <Spinner />;

  if ((!loading && !contacts) || contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  // Either render filtered contacts or all the contacts
  const contactsArray = filtered ? filtered : contacts;

  return (
    <TransitionGroup>
      {contactsArray.map((contact) => (
        <CSSTransition key={contact._id} timeout={500} classNames="item">
          <ContactItem contact={contact} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default Contact;
