export const clientObject = (id, name, surname, note) => {
  return {
    id: id,
    name: name,
    surname: surname,
    note: note  
  };
}

const client1 = clientObject('1', '1 name', '1 surname', '1 note');
const client2 = clientObject('2', '2 name', '2 surname', '2 note');
const client3 = clientObject('3', '3 name', '3 surname', '3 note');

export const clients = [
  client1,
  client2,
  client3
];

