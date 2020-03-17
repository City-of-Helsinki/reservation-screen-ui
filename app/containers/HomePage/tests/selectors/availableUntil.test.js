import { fromJS } from 'immutable';

import { makeSelectAvailableUntil } from '../../selectors';
import mockResource from '../mock/resource';
import mockResourceNoReservations from '../mock/resource-no-reservations';
import mockResourceSomeReservations from '../mock/resource-some-reservations';

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

  it('is false at 21:00 when day is fully booked', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T21:00:00+03:00'),
        resource: mockResource,
      },
    });
    expect(selector(mockedState)).toEqual(false);
  });

  it('is 20:00 (closing time) at 12:00 when day is empty', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T12:00:00+03:00'),
        resource: mockResourceNoReservations,
      },
    });
    expect(selector(mockedState).getUTCHours()).toEqual(17);
    expect(selector(mockedState).getUTCMinutes()).toEqual(0);
  });

  it('is false at 21:00 when day is empty', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T21:00:00+03:00'),
        resource: mockResourceNoReservations,
      },
    });
    expect(selector(mockedState)).toEqual(false);
  });

  it('is 09:00 at 08:00 when some reservations', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T08:00:00+03:00'),
        resource: mockResourceSomeReservations,
      },
    });
    expect(selector(mockedState).getUTCHours()).toEqual(6);
    expect(selector(mockedState).getUTCMinutes()).toEqual(0);
  });

  it('is false at 09:30 when resource is not free at that point', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T09:30:00+03:00'),
        resource: mockResourceSomeReservations,
      },
    });
    expect(selector(mockedState)).toEqual(false);
  });

  it('is 15:00 at 12:00', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T12:00:00+03:00'),
        resource: mockResourceSomeReservations,
      },
    });

    expect(selector(mockedState).getUTCHours()).toEqual(12);
    expect(selector(mockedState).getUTCMinutes()).toEqual(0);
  });
});
