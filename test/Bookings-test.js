import chai from 'chai';
const expect = chai.expect;

import Booking from '../src/Bookings.js'

describe('Booking', () => {
  
  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });
	
})