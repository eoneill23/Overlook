import $ from 'jquery';

const DOMupdates = {

  displayDate(date) {
    $('.header-span__date-today').text(date)
  },

  displayRevenueForToday(cost) {
    $('.main-span__revenue').text(cost);
  },

  displayPctOccupiedForToday(percentage) {
    $('.main-span__pct-occupied').text(percentage)
  },

  displayAvailRoomsForToday(numRooms) {
    $('.main-span__rooms-available').text(numRooms)
  },

  displayNoExistingCustomerMsg(name) {
    $('.main-input__existingCustomer-search').css({"border-color": "red", "border-width":"1px", "border-style":"solid"});
    $('.main-span_errorName').text(name);
    $('.main-para__errorMsg').show();
    $('.error-show').show();
    setTimeout( () => {
      $('.main-para__errorMsg').hide();
      $('.main-input__existingCustomer-search').css({"border-color": "", "border-width":"", "border-style":""});
    }, 5000)
  },

  displayCurrentCustomerName(name) {
    $('.header-span__current-customer').text(name);
    $('.header-hide').show();
  },

  displayCreateBookingBtn() {
    //paragraph.show() that says 'you currently don't have a booking today. would you like to create one?
    //$(.main-button__show-booking).show()
  },

  appendAvailableRooms(availableRooms, date) {
    availableRooms.forEach(room => {
      $('.main-table__avail-rooms').append(
      `<tr class="main-tr__avail-rooms data-id="${room.number}">
      <td class="main-td__avail-rooms id="td-room-num" data-id="${room.number}">${room.number}</td>
      <td class="main-td__avail-rooms" id="td-room-type" data-id="${room.number}">${room.roomType}</td>
      <td class="main-td__avail-rooms" id="td-bidet" data-id="${room.number}">${room.bidet}</td>
      <td class="main-td__avail-rooms" id="td-bed-size" data-id="${room.number}">${room.bedSize}</td>
      <td class="main-td__avail-rooms" id="td-num-beds" data-id="${room.number}">${room.numBeds}</td>
      <td class="main-td__avail-rooms" id="td-cost" data-id="${room.number}">${room.costPerNight}</td>
      </tr>`)
      $('.main-span__rooms-avail-on-date').text(date)
      $('.room-content-container').hide();
      $('.room-input-container').hide();
      $('.main-div__rooms-hide').show();
    })
  },

  displayBookingMsg(correctRoom, fullName) {
    let firstName = fullName.split(' ')[0];
    $('.main_span__first-name').text(firstName);
    $('.main_span__room-number').text(correctRoom.number);
    $('.main_span__cost').text(correctRoom.costPerNight);
    $('.main-para__booking-confirmation-msg').show();
  },

  displayBookingErrorMsg() {
    $('.main-para__booking-error-msg').show();
    setTimeout( () => {
      $('.main-para__booking-error-msg').hide();
    }, 5000)
  },

  bookingConfirmationMessage(room) {
    console.log('THIS IS THE ROOM', room)
    $('.main-span__booked-room').text(room.number);
    $('.main-span__booked-cost').text(room.costPerNight);
    $('.main-para__booking-confirmation').show();
    $('.main-para__booking-confirmation-msg').hide();
  },

  displayRoomServices(roomServices) {
    $('.main-div__rooms-hide').hide();
    $('.food-hide').show();
    roomServices.forEach(service => {
      $('.main-table__food-menu').append(
        `<tr class="main-tr__food-menu" data-id="${service.totalCost}">
        <td class="main-td__food-type right-padding" id="td-food-type" data-id="${service.totalCost}">${service.food}</td>
        <td class="main-td__food-type" id="td-food-type" data-id="${service.totalCost}">${service.totalCost}</td>
        <td class="main-td__food-type" id="td-food-type" data-id="${service.totalCost}"><input type=checkbox class="main-input__food-type"></td>
        </tr>`
      )
    })
  },

  displayRoomServiceMessage(totalCost, name) {
    $('.main__span-food-cost').text(totalCost.toFixed(2))
    $('.main-para__room-service-confirmation-msg').show();
    $('.main-button__confirm-room-service').show();
  },

  displayRoomServiceConfirmationMsg() {
    $('.main-para__room-service-confirmation-msg').hide();
    $('.main-para__room-service-confirmed').show();
    //hide the booking/room service screen
    //fade in current customer data
  },

  displayCustomerHasBookingMsg(name) {
    let firstName = name.split(' ')[0];
    $('.main-span__customer-has-booking-name').text(firstName);
    $('.main-h3__customer-has-booking').show();
  }

}

export default DOMupdates;