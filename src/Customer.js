class Customer {
  constructor(name, id, date, bookingInfo, roomServiceInfo) {
    this.name = name;
    this.id = id;
    this.currentDate = date;
    this.bookingInfo = bookingInfo;
    this.roomServiceInfo = roomServiceInfo;
  }

  // displayRoomServiceData() {
  //   DOMupdates to map through and display date, food, & total cost?
  // }

  returnRoomServiceCostOnDate(date) {
    let correctRoomServiceDate = this.getCategoryDataOnDate(date, 'roomServiceInfo')
  }

  getCategoryDataOnDate(date, property) {
    return this[property].filter(property => property.date === date)
  }
}

export default Customer;