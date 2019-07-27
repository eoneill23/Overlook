import Customer from '../src/Customer.js'
import DOMupdates from '../src/DOMupdates.js'

class Booking {
  constructor(userId, date, roomNumber) {
    this.userID = userId;
    this.date = date;
    this.roomNumber = roomNumber;
  }
}

export default Booking;