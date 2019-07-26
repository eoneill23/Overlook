import chai from 'chai';
const expect = chai.expect;

import customerData from '../data/customerSampleData.js'
import roomData from '../data/roomSampleData.js'
import bookingData from '../data/bookingSampleData.js'
import roomServiceData from '../data/roomServiceSampleData.js'
import Hotel from '../src/Hotel.js'

// chai.use(spies);

// chai.spy.on(DOMupdates, ['clearBoard'], () => {});

describe('Hotel', () => {
  let hotel;
  beforeEach(() => {
    hotel = new Hotel({customerData, roomData, bookingData, roomServiceData});
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  it('should return the percentage of rooms occupied for today', () => {
    expect(hotel.returnPctRoomsOccupied("2019/10/19")).to.equal(10);
  })

  it('should return revenue for today', () => {
    expect(hotel.returnRevenueForToday("2019/10/18")).to.equal(271.93);
  })

  it('should return rooms available for today', () => {
    expect(hotel.returnNumRoomsAvailable("2019/10/18")).to.equal(9);
  })

  it('should instantiate an existing customer', () => {
    hotel.instantiateExistingCustomer('Matilde Larson');
    expect(hotel.currentCustomer.name).to.equal('Matilde Larson');
  })

  it('should be able to create a brand new customer', () => {
    hotel.createNewCustomer('John Doe');
    expect(hotel.currentCustomer.name).to.equal('John Doe')
  })

  it('should show which rooms are available to book on a specified date', () => {
    hotel.findAvailableRooms("2019/10/18")
    expect(hotel.availableRooms.length).to.equal(9)
  })
})