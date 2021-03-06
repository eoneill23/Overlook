import $ from 'jquery';

const DOMupdates = {

  displayDate(date) {
    $('.header-span__date-today').text(date)
  },

  displayRevenueForToday(cost) {
    $('.main-span__revenue').text(cost);
  },

  displayPctOccupiedForToday(percentage) {
    $('.main-span__pct-occupied').text(percentage);
  },

  displayAvailRoomsForToday(numRooms) {
    $('.main-span__rooms-available').text(numRooms);
  },

  displayNoExistingCustomerMsg(name) {
    $('.main-input__existingCustomer-search').css({"border-color": "red", "border-width": "1px", "border-style": "solid"});
    $('.main-div__existingCustomer-search').css({"border-color": "red", "border-width": "2px", "border-style": "solid"});
    $('.main-span_errorName').text(name);
    $('.main-para__errorMsg').show();
    $('.error-show').show();
    setTimeout( () => {
      $('.main-para__errorMsg').hide();
      $('.main-input__existingCustomer-search').css({"border-color": "", "border-width": "", "border-style": ""});
      $('.main-div__existingCustomer-search').css({"border-color": "", "border-width": "", "border-style": ""});
    }, 5000)
  },

  displayCurrentCustomerName(name) {
    $('.header-span__current-customer').text(name);
    $('.header-hide').show();
  },

  appendAvailableRooms(availableRooms, date, className) {
    $('.main-tbody__avail-rooms').empty();
    availableRooms.forEach(room => {
      $('.main-tbody__avail-rooms').append(
        `<tr class="main-tr__avail-rooms data-id="${room.number}">
      <td class="main-td__${className}" id="td-room-num" data-id="${room.number}">${room.number}</td>
      <td class="main-td__${className}" id="td-room-type" data-id="${room.number}">${room.roomType}</td>
      <td class="main-td__${className}" id="td-bidet" data-id="${room.number}">${room.bidet}</td>
      <td class="main-td__${className}" id="td-bed-size" data-id="${room.number}">${room.bedSize}</td>
      <td class="main-td__${className}" id="td-num-beds" data-id="${room.number}">${room.numBeds}</td>
      <td class="main-td__${className}" id="td-cost" data-id="${room.number}">${room.costPerNight}</td>
      </tr>`);
      $('.main-h3__customer-has-booking').hide();
      $('.main-span__rooms-avail-on-date').text(date);
      $('.room-content-container').hide();
      $('.room-input-container').hide();
      $('.rooms-customer-info').hide();
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
    $('.main-span__booked-room').text(room.number);
    $('.main-span__booked-cost').text(room.costPerNight);
    $('.main-para__booking-confirmation').show();
    $('.main-para__booking-confirmation-msg').hide();
  },

  displayRoomServices(roomServices) {
    $('.main-table__food-menu').empty();
    $('.main-div__rooms-hide').hide();
    $('.food-hide').show();
    roomServices.forEach(service => {
      $('.main-table__food-menu').append(
        `<tr class="main-tr__food-menu" data-id="${service.totalCost}">
        <td class="main-td__food-type right-padding" id="td-food-type" data-id="${service.totalCost}">${service.food}</td>
        <td class="main-td__food-type" id="td-food-type" data-id="${service.totalCost}">$${service.totalCost}</td>
        <td class="main-td__food-type" id="td-food-type" data-id="${service.totalCost}"><input type=checkbox class="main-input__food-type"></td>
        </tr>`
      )
    })
  },

  displayRoomServiceMessage(totalCost) {
    $('.main__span-food-cost').text(totalCost.toFixed(2))
    $('.main-para__room-service-confirmation-msg').show();
    $('.main-button__confirm-room-service').show();
  },

  displayRoomServiceConfirmationMsg() {
    $('.main-para__room-service-confirmation-msg').hide();
    $('.main-para__room-service-confirmed').show();
  },

  displayCustomerHasBookingMsg(name) {
    let firstName = name.split(' ')[0];
    $('.main-span__customer-has-booking-name').text(firstName);
    $('.main-h3__customer-has-booking').show();
  },

  displayAllOrdersInfo(roomServices, date) {
    $('.main-span__orders-date').text(date); 
    if (roomServices.length > 0) {
      $('.no-bookings-today').hide();
      $('.main-tr__all-orders').show();
      $('.main-span__orders-date').text(date)
      roomServices.forEach(service => {
        $('.main-tbody__room-service-info').append(
          `<tr class="main-tr__food-menu" data-id="${service.totalCost}">
          <td class="main-td__food-type right-padding" id="td-food-type" data-id="${service.totalCost}">${service.food}</td>
          <td class="main-td__food-type" id="td-food-type" data-id="${service.totalCost}">$${service.totalCost}</td>
          </tr>`
        )
      })
    } else {
      $('.no-bookings-today').show();
      $('.main-tr__all-orders').hide();
    }
  },

  displayCustomerOrderInfo(roomServices, name) {
    if (roomServices.length > 0) {
      $('.main-tr__food-menu').empty()
      $('.orders-table-header').text('Room service orders')
      $('.main-table__customer-orders').show();
      roomServices.forEach(service => {
        $('.main-tbody__customer-info').append(
          `<tr class="main-tr__food-menu" data-id="${service.totalCost}">
          <td class="orders-td__food-type" data-id="${service.totalCost}">${service.date}</td>
          <td class="orders-td__food-type service-food" data-id="${service.totalCost}">${service.food}</td>
          <td class="orders-td__food-type" data-id="${service.totalCost}">$${service.totalCost}</td>
          </tr>`
        )
      })
    } else {
      $('.main-table__customer-orders').hide();
      $('.orders-table-header').text(`${name} doesn't have any room service orders.`)
    }
  },

  displayExpendituresOnDate(date, cost, name) {
    if (cost > 0) {
      $('.orders-day-expenditures').text(`Room service expenditures on ${date}`);
      $('.orders-day-cost').show();
      $('.orders-cost-on-day').text(cost.toFixed(2));
    } else {
      $('.orders-day-expenditures').text(`${name} doesn't have any expenditures today.`);
      $('.orders-day-cost').hide();
    }
  },

  displayTotalExpenditures(cost, name) {
    if (cost > 0) {
      $('.orders-all-expenditures').text('All-time expenditures');
      $('.orders-all-cost').show();
      $('.orders-cost-all-time').text(cost.toFixed(2));
    } else {
      $('.orders-all-expenditures').text(`${name} has never ordered room service.`)
      $('.orders-all-cost').hide();
    }
  },

  displayCustomerBookingInfo(bookings, name, value) {
    $('.booking-tonight-button').hide();
    $('.no-bookings-customer').empty();
    $('.rooms-span__customer-name').text(name)
    if (bookings.length > 0 && value === true) {
      bookings.forEach(booking => {
        $('.main-tbody__booking-info').append(
          `<tr class="main-tr__booking-info">
          <td class="bookings-td__booking-info">${booking.date}</td>
          <td class="bookings-td__booking-info bookings-margin-right">${booking.roomNumber}</td>
          </tr>`
        )
      })
    } else if (bookings.length > 0) {
      $('.booking-tonight-button').show();
      $('.no-bookings-customer').text(`${name} doesn't have a a booking tonight. Create one below!`);
      bookings.forEach(booking => {
        $('.main-tbody__booking-info').append(
          `<tr class="main-tr__booking-info">
          <td class="bookings-td__booking-info">${booking.date}</td>
          <td class="bookings-td__booking-info bookings-margin-right">${booking.roomNumber}</td>
          </tr>`
        )
      })
    } else {
      $('.booking-tonight-button').show();
      $('.main-tbody__booking-info').empty();
      $('.no-bookings-customer').text(`${name} doesn't have a a booking tonight. Create one below!`);
    }
  },

  selectCustomerMsg() {
    $('.main-h3__customer-has-booking').show();
    $('.main-h3__customer-has-booking').text('Please select a customer to make a booking.');
  }

}

export default DOMupdates;