import { fromJS } from 'immutable';

import { makeSelectAvailableUntil } from '../../selectors';
import mockResource from '../mock/resource.js';
import mockResourceNoReservations from '../mock/resource-no-reservations.js';
import mockResourceSomeReservations from '../mock/resource-some-reservations.js';

describe('makeSelectAvailableUntil', () => {
  const selector = makeSelectAvailableUntil();
  it('is false at 09:00 when day is fully booked', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T09:00:00+03:00'),
        resource: mockResource,
      },
    });
    expect(selector(mockedState)).toEqual(false);
  });
});

describe('makeSelectAvailableUntil', () => {
  const selector = makeSelectAvailableUntil();
  it('is false at 21:00 when day is fully booked', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T21:00:00+03:00'),
        resource: mockResource,
      },
    });
    expect(selector(mockedState)).toEqual(false);
  });
});

describe('makeSelectAvailableUntil', () => {
  const selector = makeSelectAvailableUntil();
  it('is 20:00 (closing time) at 12:00 when day is empty', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T12:00:00+03:00'),
        resource: mockResourceNoReservations,
      },
    });
    expect(selector(mockedState).getHours()).toEqual(20);
    expect(selector(mockedState).getMinutes()).toEqual(0);
  });
});

describe('makeSelectAvailableUntil', () => {
  const selector = makeSelectAvailableUntil();
  it('is 20:00 (closing time) at 21:00 when day is empty', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T21:00:00+03:00'),
        resource: mockResourceNoReservations,
      },
    });
    expect(selector(mockedState).getHours()).toEqual(20);
    expect(selector(mockedState).getMinutes()).toEqual(0);
  });
});

describe('makeSelectAvailableUntil', () => {
  const selector = makeSelectAvailableUntil();
  it('is 09:00 at 08:00 when some reservations', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T08:00:00+03:00'),
        resource: mockResourceSomeReservations,
      },
    });
    expect(selector(mockedState).getHours()).toEqual(9);
    expect(selector(mockedState).getMinutes()).toEqual(0);
  });
});

describe('makeSelectAvailableUntil', () => {
  const selector = makeSelectAvailableUntil();
  it('is false at 09:30 when resource is not free at that point', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T09:30:00+03:00'),
        resource: mockResourceSomeReservations,
      },
    });
    expect(selector(mockedState)).toEqual(false);
  });
});

describe('makeSelectAvailableUntil', () => {
  const selector = makeSelectAvailableUntil();
  it('is 15:00 at 12:00', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T12:00:00+03:00'),
        resource: mockResourceSomeReservations,
      },
    });

    expect(selector(mockedState).getHours()).toEqual(15);
    expect(selector(mockedState).getMinutes()).toEqual(0);
  });
});
