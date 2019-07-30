import chai from 'chai';
const expect = chai.expect;

import customerData from '../data/customerSampleData.js'
import roomData from '../data/roomSampleData.js'
import bookingData from '../data/bookingSampleData.js'
import roomServiceData from '../data/roomServiceSampleData.js'
import Customer from '../src/Customer.js'
import Hotel from '../src/Hotel.js'
import Admin from '../src/Administrator.js'
import Administrator from '../src/Administrator.js';

// import spies from 'chai-spies';
// import DOMupdates from '../src/DOMupdates.js'
// chai.use(spies);

// chai.spy.on(DOMupdates, ['displayNoExistingCustomerMsg'], () => {});

describe('Hotel', () => {
  let admin;
  beforeEach(() => {
		admin = new Administrator({customerData, roomData, bookingData, roomServiceData});
    admin.hotel;
    admin.instantiateExistingCustomer("Matilde Larson")
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
    expect(admin.currentCustomer).to.be.an.instanceof(Customer);
    expect(admin.currentCustomer.name).to.equal("Matilde Larson");
	});
	
	it('should return the cost of room service on a specific day', () => {
		expect(admin.currentCustomer.returnRoomServiceCostOnDate("2019/09/26")).to.equal(38.4);
	});

	it('should return the all time cost of a customers room services', () => {
		expect(admin.currentCustomer.returnAllTimeRoomServiceCost()).to.equal(83.46);
	});

	it('should throw an error if a customer has no information', () => {
		admin.createNewCustomer("Eric ONeill")
		expect(admin.currentCustomer.returnRoomServiceCostOnDate("2019/09/26")).to.equal(0);
	});

})