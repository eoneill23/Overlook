import DOMupdates from '../src/DOMupdates.js'

class Hotel {
  constructor(allData, date) {
    this.customers = allData.customerData;
    this.rooms = allData.roomData;
    this.bookings = allData.bookingData;
    this.roomServices = allData.roomServiceData;
    this.currentDate = date;
    this.availableRooms = this.findAvailableRooms(this.currentDate);
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

  findAvailableRooms(date) {
    let occupiedRooms = this.getDataByDate(date, 'bookings')
    return this.rooms.filter(room => !occupiedRooms.some(occupiedRoom => occupiedRoom.roomNumber === room.number))
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
}

export default Hotel