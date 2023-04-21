import { useState, useEffect } from 'react';
import { Section } from 'components/section/Section';
import { ContactForm } from 'components/contactForm/ContactForm';
import { ContactList } from 'components/contactList/ContactList';
import { Filter } from 'components/filter/Filter';
import { load, save } from '../../js/localStorage';
import { STORAGE_KEY } from '../../js/validationForm';

export const App = () => {
  const [contacts, setContacts] = useState(() => load(STORAGE_KEY));
  const [filter, setFilter] = useState('');

  useEffect(() => {
    save(STORAGE_KEY, contacts);
  }, [contacts]);

  const onSubmitData = obj => {
    setContacts(s => [...s, obj]);
  };

  const onHandleChange = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const filterContacts = () =>
    contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLocaleLowerCase()) ||
        contact.number.toLowerCase().includes(filter.toLocaleLowerCase())
    );

  const deleteContacts = id => {
    setContacts(s => s.filter(contact => contact.id !== id));
  };

  return (
    <>
      <Section title={'Phonebook'}>
        <ContactForm onSubmitData={onSubmitData} contacts={contacts} />
      </Section>
      <Section title={'Contacts:'}>
        <Filter onHandleChange={onHandleChange} filter={filter} />
        <ContactList
          contacts={filterContacts()}
          deleteContacts={deleteContacts}
        />
      </Section>
    </>
  );
};
