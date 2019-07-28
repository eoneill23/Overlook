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
    if (this.validateCustomerInformation()) {
    let correctRoomServiceInfo = this.getCategoryDataOnDate(date, 'roomServiceInfo');
    return correctRoomServiceInfo.reduce((totalCost, service) => {
      totalCost += service.totalCost
      return totalCost;
    }, 0)
  } else {
    //DOMupdates display error message
    return null
  }
}

  returnAllTimeRoomServiceCost() {
    if (this.validateCustomerInformation()) {
      return this.roomServiceInfo.reduce((totalCost, service) => {
        totalCost += service.totalCost
        return totalCost;
      }, 0)
    } else {
      //DOM updates display error message or should it be in if/else
      return null
    }
  }

  getCategoryDataOnDate(date, property) {
    return this[property].filter(property => property.date === date);
  }

  validateCustomerInformation() {
    if (this.bookingInfo.length === 0 && this.roomServiceInfo.length === 0) {
      return false;
    } else if (this.bookingInfo.length === 0) {
      return false;
    } else if (this.roomServiceInfo.length === 0) {
      return false;
    } else {
      return true
    }
  }

  findIfCustomerHasBookingTonight(date, property) {
    let correctBookingInfo = this.getCategoryDataOnDate(date, property);
    return correctBookingInfo.find(booking => {
      return booking.date == date;
    })
  }
}

export default Customer;