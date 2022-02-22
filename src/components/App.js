import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Form from './Form/Form.jsx';
import Section from './Section/Section';
import Contacts from './Contacts/Contacts';
import Filter from './Contacts/Filter/Filter';

import './App.css';

const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  const addContacts = data => {
    const names = contacts.map(contact => contact.name);

    names.includes(data.name)
      ? Notify.info(`${data.name} is already in contact`)
      : setContacts(prevState => [data, ...prevState]);
  };

  const deleteContacts = contatcId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contatcId)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  return (
    <>
      <Section title="Phonebook">
        <Form onSubmit={addContacts} />
      </Section>

      <Section title="Contacts">
        <Filter filter={filter} changeFilter={changeFilter} />

        <Contacts
          contacts={getVisibleContacts()}
          onDeleteContatc={deleteContacts}
        />
      </Section>
    </>
  );
};

export default App;
