import { fromJS } from 'immutable';

import {
  // eslint-disable-next-line no-unused-vars
  makeUpcomingReservations,
  makeSelectIsResourceAvailable,
} from '../../selectors';
import mockResource from '../mock/resource';

describe('makeSelectIsResourceAvailable', () => {
  const selector = makeSelectIsResourceAvailable();
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

describe('makeSelectIsResourceAvailable', () => {
  const selector = makeSelectIsResourceAvailable();
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

describe('makeSelectIsResourceAvailable', () => {
  const selector = makeSelectIsResourceAvailable();
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
