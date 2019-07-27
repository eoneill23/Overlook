import Booking from '../src/Bookings.js'
import Customer from '../src/Customer.js'
import Hotel from '../src/Hotel.js'
import DOMupdates from '../src/DOMupdates.js'

class Administrator {
    constructor(allData) {
      this.customers = allData.customerData;
      this.rooms = allData.roomData;
      this.bookings = allData.bookingData;
      this.roomServices = allData.roomServiceData;
      this.currentDate = this.generateCurrentDate();
      this.currentCustomer;
      this.hotel = new Hotel(allData, this.currentDate);
    }

  generateCurrentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return (yyyy + '/' + mm + '/' + dd);
  }

  instantiateExistingCustomer(name) {
    let foundCustomer = this.customers.find(customer => {
      return customer.name.toLowerCase() === name.toLowerCase()
    })
    if (foundCustomer === undefined) {
      DOMupdates.displayNoExistingCustomerMsg(name)
      // return false
    } else {
      let customerBookingData = this.findCustomerInfo(foundCustomer.id, 'bookings');
      let customerRoomServiceData = this.findCustomerInfo(foundCustomer.id, 'roomServices');
      this.currentCustomer = new Customer(foundCustomer.name, foundCustomer.id, this.currentDate, customerBookingData, customerRoomServiceData);
      this.customers.push(this.currentCustomer);
      DOMupdates.displayCurrentCustomerName(this.currentCustomer.name)
    }
  }

  createNewCustomer(name) {
    let newId = this.customers.length + 1;
    this.currentCustomer = new Customer(name, newId, this.currentDate, [], []);
    this.customers.push(this.currentCustomer);
  }

  findCustomerInfo(id, property) {
    return this[property].filter(property => property.userID === id)
  }

  validateBooking(date) {
    if (this.filterThroughCurrentCustomerInfo(date, 'bookings')) {
      DOMupdates.displayCreateBookingBtn()
    }
  }

  createNewBooking(userId, roomNumber) {
    let newBooking = new Booking(userId, this.currentDate, roomNumber);
    this.currentCustomer.bookingInfo.push(newBooking);
    this.bookings.push(newBooking);
  }

  // filterThroughCurrentCustomerInfo(date, property) {
  //   return this[property].filter(property => property.date === date)
  // }

  //book/unbook room
  //purchase room service
  //upgrade a room
  //calculate total bill
}

export default Administrator;