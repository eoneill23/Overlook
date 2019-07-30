import chai from 'chai';
const expect = chai.expect;

import customerData from '../data/customerSampleData.js'
import roomData from '../data/roomSampleData.js'
import bookingData from '../data/bookingSampleData.js'
import roomServiceData from '../data/roomServiceSampleData.js'
import Hotel from '../src/Hotel.js'
import Admin from '../src/Administrator.js'

import spies from 'chai-spies';
import DOMupdates from '../src/DOMupdates.js'
chai.use(spies);

chai.spy.on(DOMupdates, ['displayPctOccupiedForToday', 'displayRevenueForToday', 'displayAvailRoomsForToday', 'displayNoExistingCustomerMsg', 'displayCurrentCustomerName'], () => {});

describe('Hotel', () => {
  let admin;
  beforeEach(() => {
    admin = new Admin ({customerData, roomData, bookingData, roomServiceData})
    admin.hotel;
    admin.instantiateExistingCustomer('Matilde Larson');
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
    expect(admin.hotel).to.be.an.instanceof(Hotel);
  });

  it('should return the percentage of rooms occupied for today', () => {
    expect(admin.hotel.returnPctRoomsOccupied("2019/10/19")).to.equal(20);
  })

  it('should return revenue for today', () => {
    expect(admin.hotel.returnRevenueForToday("2019/10/18")).to.equal(271.93);
  })

  it('should return rooms available for today', () => {
    expect(admin.hotel.returnNumRoomsAvailable("2019/10/18")).to.equal(9);
  })

  it('should show which rooms are available to book on a specified date', () => {
    admin.hotel.findAvailableRooms("2019/10/18");
    expect(admin.hotel.availableRooms.length).to.equal(10);
  })

  it('should show the most popular booking date', () => {
    expect(admin.hotel.findMostBookedDate()).to.equal("2019/09/01");
  })

  it('should show the date with the most available rooms', () => {
    expect(admin.hotel.findDateWithMostAvailableRooms()).to.equal("2019/07/31");
  })

  it('should show a list of available rooms on a specified date', () => {
    admin.hotel.findAvailableRooms("2019/07/28");
    expect(admin.hotel.availableRooms.length).to.equal(10);
  })
})