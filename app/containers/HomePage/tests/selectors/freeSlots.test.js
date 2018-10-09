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
  it('returns 3 items', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T07:00:00+03:00'),
        resource: mockResourceSomeReservations,
      },
    });
    expect(selector(mockedState).length).toEqual(5);
  });
});
