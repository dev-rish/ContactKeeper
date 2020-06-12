import React from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../context/auth/authContext";
import { useContext } from "react";
import { useEffect } from "react";

const Home = () => {
  const context = useContext(AuthContext);

  useEffect(() => {
    context.loadUser();
  }, []);

  return (
    <div className="grid-2">
      <div className="">
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
