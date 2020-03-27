import { fromJS } from 'immutable';

import { makeSelectNextAvailableTime } from '../../selectors';
import mockResource from '../mock/resource';
import mockResourceNoReservations from '../mock/resource-no-reservations';
import mockResourceSomeReservations from '../mock/resource-some-reservations';

describe('makeSelectNextAvailableTime', () => {
  const selector = makeSelectNextAvailableTime();
  it('returns is 08:00 at 07:30 when no reservations', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T07:30:00+03:00'),
        resource: mockResourceNoReservations,
      },
    });
    const nextAvailableTime = selector(mockedState);
    expect(nextAvailableTime.getUTCHours()).toEqual(5);
    expect(nextAvailableTime.getUTCMinutes()).toEqual(0);
  });
});

describe('makeSelectNextAvailableTime', () => {
  const selector = makeSelectNextAvailableTime();
  it('returns is 08:30 at 08:30 when no reservations', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T08:30:00+03:00'),
        resource: mockResourceNoReservations,
      },
    });
    const nextAvailableTime = selector(mockedState);
    expect(nextAvailableTime.getUTCHours()).toEqual(5);
    expect(nextAvailableTime.getUTCMinutes()).toEqual(30);
  });
});

describe('makeSelectNextAvailableTime', () => {
  const selector = makeSelectNextAvailableTime();
  it('returns nothing on 21:00 when no reservations', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T21:00:00+03:00'),
        resource: mockResourceNoReservations,
      },
    });
    const nextAvailableTime = selector(mockedState);
    expect(nextAvailableTime).toEqual(false);
  });
});

describe('makeSelectNextAvailableTime', () => {
  const selector = makeSelectNextAvailableTime();
  it('returns on 08:00 at 07:30 with a few reservations', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T07:30:00+03:00'),
        resource: mockResourceSomeReservations,
      },
    });
    const nextAvailableTime = selector(mockedState);
    expect(nextAvailableTime.getUTCHours()).toEqual(5);
    expect(nextAvailableTime.getUTCMinutes()).toEqual(0);
  });
});

describe('makeSelectNextAvailableTime', () => {
  const selector = makeSelectNextAvailableTime();
  it('returns on 11:00 at 09:30 with a few reservations', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T09:30:00+03:00'),
        resource: mockResourceSomeReservations,
      },
    });
    const nextAvailableTime = selector(mockedState);
    expect(nextAvailableTime.getUTCHours()).toEqual(8);
    expect(nextAvailableTime.getUTCMinutes()).toEqual(0);
  });
});

describe('makeSelectNextAvailableTime', () => {
  const selector = makeSelectNextAvailableTime();
  it('returns on 12:00 at 12:00 with a few reservations', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T12:00:00+03:00'),
        resource: mockResourceSomeReservations,
      },
    });
    const nextAvailableTime = selector(mockedState);
    expect(nextAvailableTime.getUTCHours()).toEqual(9);
    expect(nextAvailableTime.getUTCMinutes()).toEqual(0);
  });
});

describe('makeSelectNextAvailableTime', () => {
  const selector = makeSelectNextAvailableTime();
  it('returns on false at 09:15 with full reservations', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T09:15:00+03:00'),
        resource: mockResource,
      },
    });
    const nextAvailableTime = selector(mockedState);
    expect(nextAvailableTime).toEqual(false);
  });
});
