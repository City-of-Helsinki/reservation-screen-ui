import { fromJS } from 'immutable';

import {
  makeUpcomingReservations,
  makeSelectIsResourceFree,
} from '../../selectors';
import mockResource from '../mock/resource.js';

describe('makeUpcomingReservations 10 from 07:00', () => {
  const selector = makeUpcomingReservations(10);
  it('should select all upcoming reservations', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T07:00:00+03:00'),
        resource: mockResource,
      },
    });
    expect(selector(mockedState).size).toEqual(5);
  });
});

describe('makeUpcomingReservations 3 from 07:00', () => {
  const selector = makeUpcomingReservations(3);
  it('should select 3 upcoming reservations', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T07:00:00+03:00'),
        resource: mockResource,
      },
    });
    expect(selector(mockedState).size).toEqual(3);
  });
});

describe('makeUpcomingReservations all from 08:30', () => {
  const selector = makeUpcomingReservations(10);
  it('should select 5 upcoming reservations', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T08:30:00+03:00'),
        resource: mockResource,
      },
    });
    expect(selector(mockedState).size).toEqual(5);
  });
});

describe('makeUpcomingReservations all from 20:00', () => {
  const selector = makeUpcomingReservations(10);
  it('should select 0 upcoming reservations', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T20:00:00+03:00'),
        resource: mockResource,
      },
    });
    expect(selector(mockedState).size).toEqual(0);
  });
});
