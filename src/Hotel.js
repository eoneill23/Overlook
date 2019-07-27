import Customer from '../src/Customer.js'
import DOMupdates from '../src/DOMupdates.js'

class Hotel {
  constructor(allData) {
    this.customers = allData.customerData;
    this.rooms = allData.roomData;
    this.bookings = allData.bookingData;
    this.roomServices = allData.roomServiceData;
    this.currentCustomer;
    this.currentDate = this.generateCurrentDate();
    this.availableRooms = this.findAvailableRooms(this.currentDate);
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

  returnPctRoomsOccupied(date) {
    let correctBookingData = this.getDataByDate(date, 'bookings');
    let percentage = Math.floor((correctBookingData.length / this.rooms.length ) * 100);
    DOMupdates.displayPctOccupiedForToday(percentage);
    return percentage;
  }
  
  returnRevenueForToday(date) {
    let correctBookingInfo = this.getDataByDate(date, 'bookings');
    let correctRoomServiceInfo = this.getDataByDate(date, 'roomServices')
    let bookingCost = this.rooms.reduce((totalCost, room) => {
      correctBookingInfo.forEach(booking => {
        if (booking.roomNumber === room.number) {
          totalCost += room.costPerNight;
        }
      })
      return totalCost
    }, 0)
    let totalCostToday = bookingCost += correctRoomServiceInfo.reduce((totalRoomServiceCost, roomService) => {
      return totalRoomServiceCost += roomService.totalCost
    }, 0)
    DOMupdates.displayRevenueForToday(totalCostToday.toFixed(2));
    return Number(totalCostToday.toFixed(2));
  }

  returnNumRoomsAvailable(date) {
    let correctBookingData = this.getDataByDate(date, 'bookings');
    //need to have unoccupied rooms in order to be able to book them
    let roomsAvailable = this.rooms.length - correctBookingData.length;
    DOMupdates.displayAvailRoomsForToday(roomsAvailable);
    return roomsAvailable;
  }

  getDataByDate(date, property) {
    return this[property].filter(property => {
      return property.date === date
    });
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

  findAvailableRooms(date) {
    let occupiedRooms = this.getDataByDate(date, 'bookings')
    return this.rooms.filter(room => !occupiedRooms.some(occupiedRoom => occupiedRoom.roomNumber === room.number))
    console.log(this.availableRooms)
  }

  findMostBookedDate() {
    let bookingCounter = this.bookings.reduce((acc, booking) => {
      if (!acc[booking.date]) {
        acc[booking.date] = 1
      } else {
        acc[booking.date] ++
      }
      return acc;
    }, {})
    let keys = Object.keys(bookingCounter);
    return keys.reduce((acc, key) => {
      return bookingCounter[acc] > bookingCounter[key] ? acc : key;
    }, '');
  }

  findDateWithMostAvailableRooms() {
    let bookingCounter = this.bookings.reduce((acc, booking) => {
      if (!acc[booking.date]) {
        acc[booking.date] = 1
      } else {
        acc[booking.date] ++
      }
      return acc;
    }, {})
    let keys = Object.keys(bookingCounter);
    return keys.reduce((acc, key) => {
      return bookingCounter[acc] < bookingCounter[key] ? acc : key;
    }, '');
  }

  // createBooking() {
  //   if (this.filterThroughCurrentCustomerInfo(this.currentDate, 'bookings')) {
  //       filter through current customer bookings for current date, if length is 0, able to create new one
  //   }
  // }

  // filterThroughCurrentCustomerInfo(date, property) {
  //   return this[property].filter(property => property.date === date)
  // }

  //book/unbook room
  //purchase room service
  //upgrade a room
  //calculate total bill
}

export default Hotel