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
  }

}

export default DOMupdates;