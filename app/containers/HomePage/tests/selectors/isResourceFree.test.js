import { fromJS } from 'immutable';

import {
  makeUpcomingReservations,
  makeSelectIsResourceFree,
} from '../../selectors';
import mockResource from '../mock/resource.js';

describe('makeSelectIsResourceFree', () => {
  const selector = makeSelectIsResourceFree();
  it('is free at 07:30', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T07:30:00+03:00'),
        resource: mockResource,
      },
    });
    expect(selector(mockedState)).toEqual(true);
  });
});

describe('makeSelectIsResourceFree', () => {
  const selector = makeSelectIsResourceFree();
  it('is free at 08:30', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T08:30:00+03:00'),
        resource: mockResource,
      },
    });
    expect(selector(mockedState)).toEqual(false);
  });
});

describe('makeSelectIsResourceFree', () => {
  const selector = makeSelectIsResourceFree();
  it('is free at 20:00', () => {
    const mockedState = fromJS({
      home: {
        date: new Date('2018-09-17T20:00:00+03:00'),
        resource: mockResource,
      },
    });
    expect(selector(mockedState)).toEqual(true);
  });
});
