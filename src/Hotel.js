import Customer from '../src/Customer.js'

class Hotel {
  constructor(allData) {
    this.customers = allData.customerData;
    this.rooms = allData.roomData;
    this.bookings = allData.bookingData;
    this.roomServices = allData.roomServiceData;
    this.currentCustomer;
    this.currentDate = this.generateCurrentDate();
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
    return (dd + '/' + mm + '/' + yyyy);
  }

  returnPctRoomsOccupied(date) {
    let correctBookingData = this.getDataByDate(date, 'bookings');
    return Math.floor((correctBookingData.length / this.rooms.length ) * 100);
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
    return bookingCost += correctRoomServiceInfo.reduce((totalRoomServiceCost, roomService) => {
      return totalRoomServiceCost += roomService.totalCost
    }, 0)
  }

  returnRoomsAvailable(date) {
    let correctBookingData = this.getDataByDate(date, 'bookings');
    return this.rooms.length - correctBookingData.length
  }

  getDataByDate(date, property) {
    return this[property].filter(property => {
      return property.date === date
    });
  }

  assignCurrentCustomer(name) {
    let foundCustomer = this.customers.find(customer => {
      return customer.name === name
    })
    if (foundCustomer === undefined) {
      return false
    } else {
      let customerBookingData = this.findCustomerInfo(foundCustomer.id, 'bookings');
      let customerRoomServiceData = this.findCustomerInfo(foundCustomer.id, 'roomServices');
      this.currentCustomer = new Customer(foundCustomer.name, foundCustomer.id, this.currentDate, customerBookingData, customerRoomServiceData);
      console.log(this.currentCustomer)
    }
  }

  findCustomerInfo(id, property) {
    return this[property].filter(property => property.userID === id)
  }
}

export default Hotel