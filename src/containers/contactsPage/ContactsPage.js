import React, {useState, useEffect} from "react";
import {ContactForm} from "../../components/contactForm/ContactForm";
import {TileList} from "../../components/tileList/TileList";

export const ContactsPage = ({contacts, addContact}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [duplicate, setDuplicate] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!duplicate) {
      addContact(name, phone, email);
      setName("");
      setPhone("");
      setEmail("");
    }
  };

  useEffect(() => {
    const isDuplicated = () => {
      const found = contacts.find(contact => contact.name === name);
      if(found !== undefined) {
        return true;
      }
      return false;
    };

    if(isDuplicated()) {
      setDuplicate(true);
    } else {
      setDuplicate(false);
    }
  }, [name, contacts, duplicate]);

  return (
    <div>
      <section>
        <h2>
          Add Contact~
          {duplicate ? "-Name already exists" : ""}
          </h2> 
        <ContactForm
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          handleSubmit={handleSubmit}
          />
      </section>
      <hr />
      <section>
        <h2>Contacts</h2>
        <TileList tiles={contacts} />
      </section>
    </div>
  );
};
