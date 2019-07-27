import chai from 'chai';
const expect = chai.expect;

import customerData from '../data/customerSampleData.js'
import roomData from '../data/roomSampleData.js'
import bookingData from '../data/bookingSampleData.js'
import roomServiceData from '../data/roomServiceSampleData.js'
import Customer from '../src/Customer.js'
import Hotel from '../src/Hotel.js'

// import spies from 'chai-spies';
// import DOMupdates from '../src/DOMupdates.js'
// chai.use(spies);

// chai.spy.on(DOMupdates, ['displayNoExistingCustomerMsg'], () => {});

describe('Hotel', () => {
  let hotel, customer;
  beforeEach(() => {
    hotel = new Hotel({customerData, roomData, bookingData, roomServiceData});
    hotel.instantiateExistingCustomer("Matilde Larson")
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
    expect(hotel.currentCustomer).to.be.an.instanceof(Customer);
    expect(hotel.currentCustomer.name).to.equal("Matilde Larson");
	});
	
	it('should return the cost of room service on a specific day', () => {
		expect(hotel.currentCustomer.returnRoomServiceCostOnDate("2019/09/26")).to.equal(38.4);
	});

	it('should return the all time cost of a customers room services', () => {
		expect(hotel.currentCustomer.returnAllTimeRoomServiceCost()).to.equal(51.23);
	});

	it('should throw an error if a customer has no information', () => {
		hotel.createNewCustomer("Eric ONeill")
		expect(hotel.currentCustomer.returnRoomServiceCostOnDate("2019/09/26")).to.equal(null);
	});

  // it('should give a breakdown of dates and cost of room services', () => {
	// 	hotel.currentCustomer.displayRoomServiceData();
		
  // })
})