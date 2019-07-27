import chai from 'chai';
const expect = chai.expect;

import customerData from '../data/customerSampleData.js';
import roomData from '../data/roomSampleData.js';
import bookingData from '../data/bookingSampleData.js';
import roomServiceData from '../data/roomServiceSampleData.js';
import Administrator from '../src/Administrator.js';

// import spies from 'chai-spies';
// import DOMupdates from '../src/DOMupdates.js'
// chai.use(spies);

// chai.spy.on(DOMupdates, [''], () => {});

describe('Administrator', () => {
  let admin;
  beforeEach(() => {
    admin = new Administrator({customerData, roomData, bookingData, roomServiceData});
  });

  it('should instantiate an existing customer', () => {
    admin.instantiateExistingCustomer('Matilde Larson')
    expect(admin.currentCustomer.name).to.equal('Matilde Larson');
  })

  it('should be able to create a brand new customer', () => {
    admin.createNewCustomer('John Doe');
    expect(admin.currentCustomer.name).to.equal('John Doe')
  })

  // it('should be able to book a room', () => {
  //   hotel.createBooking()
  //   console.log(hotel.currentCustomer)
  //   expect(hotel.currentCustomer.bookingInfo.length).to.equal(2)
  // })

})