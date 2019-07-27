import chai from 'chai';
const expect = chai.expect;

import customerData from '../data/customerSampleData.js';
import roomData from '../data/roomSampleData.js';
import bookingData from '../data/bookingSampleData.js';
import roomServiceData from '../data/roomServiceSampleData.js';
import Administrator from '../src/Administrator.js';

import spies from 'chai-spies';
import DOMupdates from '../src/DOMupdates.js'
chai.use(spies);

chai.spy.on(DOMupdates, ['displayCreateBookingBtn'], () => {});

describe('Administrator', () => {
  let admin;
  beforeEach(() => {
    admin = new Administrator({customerData, roomData, bookingData, roomServiceData});
    admin.instantiateExistingCustomer('Matilde Larson')
  });

  it('should instantiate an existing customer', () => {
    expect(admin.currentCustomer.name).to.equal('Matilde Larson');
  })

  it('should be able to create a brand new customer', () => {
    admin.createNewCustomer('John Doe');
    expect(admin.currentCustomer.name).to.equal('John Doe')
  })

  it('should be able to create a new booking', () => {
    admin.createNewBooking(1, "2019/09/29", 34);
    console.log(admin.currentCustomer)
    expect(admin.currentCustomer.bookingInfo.length).to.equal(2);
    expect(admin.bookings.length).to.equal(25);
  })

  // it('should be able to book a room', () => {
  //   admin.validateBooking('2019/09/28');
  //   expect(DOMupdates.displayCreateBookingBtn).to.have.been.called(1);
  // })

})