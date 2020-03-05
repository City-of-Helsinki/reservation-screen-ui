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

    expect(freeSlots[0].begin.getHours()).toEqual(8);
    expect(freeSlots[0].begin.getMinutes()).toEqual(0);
    expect(freeSlots[0].end.getHours()).toEqual(8);
    expect(freeSlots[0].end.getMinutes()).toEqual(30);

    expect(freeSlots[1].begin.getHours()).toEqual(8);
    expect(freeSlots[1].begin.getMinutes()).toEqual(0);
    expect(freeSlots[1].end.getHours()).toEqual(9);
    expect(freeSlots[1].end.getMinutes()).toEqual(0);
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

    expect(freeSlots[0].begin.getHours()).toEqual(12);
    expect(freeSlots[0].begin.getMinutes()).toEqual(0);
    expect(freeSlots[0].end.getHours()).toEqual(12);
    expect(freeSlots[0].end.getMinutes()).toEqual(30);

    expect(freeSlots[1].begin.getHours()).toEqual(12);
    expect(freeSlots[1].begin.getMinutes()).toEqual(0);
    expect(freeSlots[1].end.getHours()).toEqual(13);
    expect(freeSlots[1].end.getMinutes()).toEqual(0);

    expect(freeSlots[2].begin.getHours()).toEqual(12);
    expect(freeSlots[2].begin.getMinutes()).toEqual(0);
    expect(freeSlots[2].end.getHours()).toEqual(13);
    expect(freeSlots[2].end.getMinutes()).toEqual(30);
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
    //  output += slot.begin.getHours() + ' - ' + slot.end.getHours() + '\n';
    // });
    // console.log(output);

    const freeSlots = selector(mockedState);
    expect(freeSlots.length).toEqual(4);

    expect(freeSlots[0].begin.getHours()).toEqual(11);
    expect(freeSlots[0].begin.getMinutes()).toEqual(0);
    expect(freeSlots[0].end.getHours()).toEqual(11);
    expect(freeSlots[0].end.getMinutes()).toEqual(30);

    expect(freeSlots[1].begin.getHours()).toEqual(11);
    expect(freeSlots[1].begin.getMinutes()).toEqual(0);
    expect(freeSlots[1].end.getHours()).toEqual(12);
    expect(freeSlots[1].end.getMinutes()).toEqual(0);

    expect(freeSlots[2].begin.getHours()).toEqual(11);
    expect(freeSlots[2].begin.getMinutes()).toEqual(0);
    expect(freeSlots[2].end.getHours()).toEqual(12);
    expect(freeSlots[2].end.getMinutes()).toEqual(30);

    expect(freeSlots[3].begin.getHours()).toEqual(11);
    expect(freeSlots[3].begin.getMinutes()).toEqual(0);
    expect(freeSlots[3].end.getHours()).toEqual(13);
    expect(freeSlots[3].end.getMinutes()).toEqual(0);
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

    expect(freeSlots[0].begin.getHours()).toEqual(14);
    expect(freeSlots[0].begin.getMinutes()).toEqual(0);
    expect(freeSlots[0].end.getHours()).toEqual(14);
    expect(freeSlots[0].end.getMinutes()).toEqual(30);
  });
});
