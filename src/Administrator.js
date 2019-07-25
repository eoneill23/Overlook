class Administrator {
    constructor(allData) {
      this.customers = allData.customerData;
      this.rooms = allData.roomData;
      this.bookings = allData.bookingData;
      this.roomServices = allData.roomServiceData;
    }
}

export default Administrator;