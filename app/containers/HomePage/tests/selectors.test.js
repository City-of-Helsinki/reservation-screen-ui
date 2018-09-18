import { fromJS } from 'immutable';

import { makeUpcomingReservations } from '../selectors';
import mockResource from './mock/resource.js';

describe('makeUpcomingReservations from 07:00', () => {
  const date = new Date('2018-09-17T07:00:00+03:00');
  const selector = makeUpcomingReservations(date);
  it('should select all upcoming reservations', () => {
    const mockedState = fromJS({
      home: {
        resource: mockResource,
      },
    });
    expect(selector(mockedState).length).toEqual(5);
  });
});
