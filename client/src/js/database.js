import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('PUT to the database');
  const todosDb = await openDB('contacts', 1);
  const tx = todosDb.transaction('contacts', 'readwrite');
  const store = tx.objectStore('contacts');
  const request = store.put({  todo: content });
  const result = await request;
  console.log('Updated one: ', result);
};

export const getDb = async () => {
  console.log('GET all from contacts');
  const db = await openDB('contacts', 1);
  const tx = db.transaction('contacts', 'readonly');
  const store = tx.objectStore('contacts');
  const request = store.getAll();
  const result = await request;
  console.log('data retrieved: ', result);
  return result;
};

initdb();
