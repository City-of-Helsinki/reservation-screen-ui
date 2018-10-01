import { fromJS } from 'immutable';

import {
  makeUpcomingReservations,
  makeSelectIsResourceFree,
} from '../selectors';
import mockResource from './mock/resource.js';

describe('makeUpcomingReservations 10 from 07:00', () => {
  const date = new Date('2018-09-17T07:00:00+03:00');
  const selector = makeUpcomingReservations(date, 10);
  it('should select all upcoming reservations', () => {
    const mockedState = fromJS({
      home: {
        resource: mockResource,
      },
    });
    expect(selector(mockedState).size).toEqual(5);
  });
});

describe('makeUpcomingReservations 3 from 07:00', () => {
  const date = new Date('2018-09-17T07:00:00+03:00');
  const selector = makeUpcomingReservations(date, 3);
  it('should select 3 upcoming reservations', () => {
    const mockedState = fromJS({
      home: {
        resource: mockResource,
      },
    });
    expect(selector(mockedState).size).toEqual(3);
  });
});

describe('makeUpcomingReservations all from 08:30', () => {
  const date = new Date('2018-09-17T08:30:00+03:00');
  const selector = makeUpcomingReservations(date, 10);
  it('should select 4 upcoming reservations', () => {
    const mockedState = fromJS({
      home: {
        resource: mockResource,
      },
    });
    expect(selector(mockedState).size).toEqual(4);
  });
});

describe('makeUpcomingReservations all from 20:00', () => {
  const date = new Date('2018-09-17T20:00:00+03:00');
  const selector = makeUpcomingReservations(date, 10);
  it('should select 0 upcoming reservations', () => {
    const mockedState = fromJS({
      home: {
        resource: mockResource,
      },
    });
    expect(selector(mockedState).size).toEqual(0);
  });
});

describe('makeSelectIsResourceFree', () => {
  const date = new Date('2018-09-17T07:30:00+03:00');
  const selector = makeSelectIsResourceFree(date);
  it('is free at 07:30', () => {
    const mockedState = fromJS({
      home: {
        resource: mockResource,
      },
    });
    expect(selector(mockedState)).toEqual(true);
  });
});

describe('makeSelectIsResourceFree', () => {
  const date = new Date('2018-09-17T08:30:00+03:00');
  const selector = makeSelectIsResourceFree(date);
  it('is free at 08:30', () => {
    const mockedState = fromJS({
      home: {
        resource: mockResource,
      },
    });
    expect(selector(mockedState)).toEqual(false);
  });
});

describe('makeSelectIsResourceFree', () => {
  const date = new Date('2018-09-17T20:00:00+03:00');
  const selector = makeSelectIsResourceFree(date);
  it('is free at 20:00', () => {
    const mockedState = fromJS({
      home: {
        resource: mockResource,
      },
    });
    expect(selector(mockedState)).toEqual(true);
  });
});
