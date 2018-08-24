export const scheduleObject = (id, description, start, end, client, note) => {
  return {
    id: id,
    description: description,
    start: start,
    end: end,
    client: client,
    note: note
  };
};

const schedule1 = scheduleObject('1', 'schedule 1', 1533117600, 1533117600, 'client 1', 'note 1');
const schedule2 = scheduleObject('2', 'schedule 2', 1533117600, 1533117600, 'client 2', 'note 2');
const schedule3 = scheduleObject('3', 'schedule 3', 1533117600, 1533117600, 'client 3', 'note 3');

export const schedules = [schedule1, schedule2, schedule3];
