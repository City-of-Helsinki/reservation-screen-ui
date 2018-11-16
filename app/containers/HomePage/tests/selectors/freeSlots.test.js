import { fromJS } from 'immutable';

import { makeSelectFreeSlots } from '../../selectors';
import mockResource from '../mock/resource.js';
import mockResourceNoReservations from '../mock/resource-no-reservations.js';
import mockResourceSomeReservations from '../mock/resource-some-reservations.js';

describe('makeSelectFreeSlots', () => {
  const selector = makeSelectFreeSlots();
  it('is full list on empty day', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T07:00:00+03:00'),
        resource: mockResourceNoReservations,
      },
    });
    expect(selector(mockedState).length).toEqual(12);
  });
});

describe('makeSelectFreeSlots', () => {
  const selector = makeSelectFreeSlots();
  it('is 8 item at 12:00 on empty day', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T12:00:00+03:00'),
        resource: mockResourceNoReservations,
      },
    });
    expect(selector(mockedState).length).toEqual(8);
  });
});

describe('makeSelectFreeSlots', () => {
  const selector = makeSelectFreeSlots();
  it('is empty list on full day', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T07:00:00+03:00'),
        resource: mockResource,
      },
    });
    expect(selector(mockedState).length).toEqual(0);
  });
});
describe('makeSelectFreeSlots', () => {
  const selector = makeSelectFreeSlots();
  it('returns 5 items', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T07:00:00+03:00'),
        resource: mockResourceSomeReservations,
      },
    });

    // Debugging. Enjoy ;)
    /*
    const slots = selector(mockedState);
    let output = '';
    slots.map(slot => {
      output += slot.begin.getHours() + ' - ' + slot.end.getHours() + '\n';
    });
    console.log(output);
    */

    const freeSlots = selector(mockedState);
    expect(freeSlots.length).toEqual(5);

    expect(freeSlots[0].begin.getHours()).toEqual(8);
    expect(freeSlots[0].end.getHours()).toEqual(9);

    expect(freeSlots[1].begin.getHours()).toEqual(11);
    expect(freeSlots[1].end.getHours()).toEqual(12);

    expect(freeSlots[2].begin.getHours()).toEqual(12);
    expect(freeSlots[2].end.getHours()).toEqual(13);

    expect(freeSlots[3].begin.getHours()).toEqual(13);
    expect(freeSlots[3].end.getHours()).toEqual(14);

    expect(freeSlots[4].begin.getHours()).toEqual(14);
    expect(freeSlots[4].end.getHours()).toEqual(15);
  });
});
