import { fromJS } from 'immutable';

import { makeSelectFreeSlots } from '../../selectors';
import mockResource from '../mock/resource';
import mockResourceNoReservations from '../mock/resource-no-reservations';
import mockResourceSomeReservations from '../mock/resource-some-reservations';

describe('makeSelectFreeSlots', () => {
  const selector = makeSelectFreeSlots(4);
  it('is full list on empty day', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T07:00:00+03:00'),
        resource: mockResourceNoReservations,
      },
    });

    const freeSlots = selector(mockedState);
    expect(freeSlots.length).toEqual(4);

    expect(freeSlots[0].begin.getUTCHours()).toEqual(5);
    expect(freeSlots[0].begin.getUTCMinutes()).toEqual(0);
    expect(freeSlots[0].end.getUTCHours()).toEqual(5);
    expect(freeSlots[0].end.getUTCMinutes()).toEqual(30);

    expect(freeSlots[1].begin.getUTCHours()).toEqual(5);
    expect(freeSlots[1].begin.getUTCMinutes()).toEqual(30);
    expect(freeSlots[1].end.getUTCHours()).toEqual(6);
    expect(freeSlots[1].end.getUTCMinutes()).toEqual(0);
  });
});

describe('makeSelectFreeSlots', () => {
  const selector = makeSelectFreeSlots();
  it('is 4 item at 12:00 on empty day', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T12:00:00+03:00'),
        resource: mockResourceNoReservations,
      },
    });

    const freeSlots = selector(mockedState);

    expect(freeSlots[0].begin.getUTCHours()).toEqual(9);
    expect(freeSlots[0].begin.getUTCMinutes()).toEqual(0);
    expect(freeSlots[0].end.getUTCHours()).toEqual(9);
    expect(freeSlots[0].end.getUTCMinutes()).toEqual(30);

    expect(freeSlots[1].begin.getUTCHours()).toEqual(9);
    expect(freeSlots[1].begin.getUTCMinutes()).toEqual(30);
    expect(freeSlots[1].end.getUTCHours()).toEqual(10);
    expect(freeSlots[1].end.getUTCMinutes()).toEqual(0);

    expect(freeSlots[2].begin.getUTCHours()).toEqual(10);
    expect(freeSlots[2].begin.getUTCMinutes()).toEqual(0);
    expect(freeSlots[2].end.getUTCHours()).toEqual(10);
    expect(freeSlots[2].end.getUTCMinutes()).toEqual(30);
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
  const selector = makeSelectFreeSlots(4);
  it('returns items on semi-booked day', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T11:12:00+03:00'),
        resource: mockResourceSomeReservations,
      },
    });

    // Debugging. Enjoy ;)
    // let output = '';
    // slots.map(slot => {
    //  output += slot.begin.getUTCHours() + ' - ' + slot.end.getUTCHours() + '\n';
    // });
    // console.log(output);

    const freeSlots = selector(mockedState);
    expect(freeSlots.length).toEqual(4);

    expect(freeSlots[0].begin.getUTCHours()).toEqual(8);
    expect(freeSlots[0].begin.getUTCMinutes()).toEqual(0);
    expect(freeSlots[0].end.getUTCHours()).toEqual(8);
    expect(freeSlots[0].end.getUTCMinutes()).toEqual(30);

    expect(freeSlots[1].begin.getUTCHours()).toEqual(8);
    expect(freeSlots[1].begin.getUTCMinutes()).toEqual(30);
    expect(freeSlots[1].end.getUTCHours()).toEqual(9);
    expect(freeSlots[1].end.getUTCMinutes()).toEqual(0);

    expect(freeSlots[2].begin.getUTCHours()).toEqual(9);
    expect(freeSlots[2].begin.getUTCMinutes()).toEqual(0);
    expect(freeSlots[2].end.getUTCHours()).toEqual(9);
    expect(freeSlots[2].end.getUTCMinutes()).toEqual(30);

    expect(freeSlots[3].begin.getUTCHours()).toEqual(9);
    expect(freeSlots[3].begin.getUTCMinutes()).toEqual(30);
    expect(freeSlots[3].end.getUTCHours()).toEqual(10);
    expect(freeSlots[3].end.getUTCMinutes()).toEqual(0);
  });
});

describe('makeSelectFreeSlots', () => {
  const selector = makeSelectFreeSlots(4);
  it('returns items before space is occupied', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T14:15:00+03:00'),
        resource: mockResourceSomeReservations,
      },
    });

    const freeSlots = selector(mockedState);
    expect(freeSlots.length).toEqual(2);

    expect(freeSlots[0].begin.getUTCHours()).toEqual(11);
    expect(freeSlots[0].begin.getUTCMinutes()).toEqual(0);
    expect(freeSlots[0].end.getUTCHours()).toEqual(11);
    expect(freeSlots[0].end.getUTCMinutes()).toEqual(30);
  });
});
