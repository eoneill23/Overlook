import $ from 'jquery';
import './css/base.scss';

import Administrator from '../src/Administrator.js';
import DOMupdates from '../src/DOMupdates.js';

let customerData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then((response) => {
  return response.json()
});
let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then((response) => {
  return response.json()
});
let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then((response) => {
  return response.json()
});
let roomServiceData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices').then((response) => {
  return response.json()
});

var admin;
let combinedData = {'customerData': {}, 'roomData': {}, 'bookingData': {}, 'roomServiceData': {}}

Promise.all([customerData, roomData, bookingData, roomServiceData])
  .then((values) => {
    combinedData['customerData'] = values[0].users;
    combinedData['roomData'] = values[1].rooms;
    combinedData['bookingData'] = values[2].bookings;
    combinedData['roomServiceData'] = values[3].roomServices;
    admin = new Administrator(combinedData);
    admin.hotel.returnRevenueForToday(admin.hotel.currentDate);
    admin.hotel.returnPctRoomsOccupied(admin.hotel.currentDate);
    admin.hotel.returnNumRoomsAvailable(admin.hotel.currentDate);
    return combinedData;
  })
  .catch(error => console.log(`Error in promises ${error}`));

const date = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let current_datetime = new Date();
  let formatted_date =
    days[current_datetime.getDay()] +
    " - " +
    months[current_datetime.getMonth()] +
    " " +
    current_datetime.getDate() +
    ", " +
  current_datetime.getFullYear();
  DOMupdates.displayDate(formatted_date)
  return formatted_date;
};
date();


$(document).ready(() => {
  $('.main-hide').hide();
  $('.main-para__errorMsg').hide();
  $('.header-hide').hide();
  $('.main-para__booking-error-msg').hide();
  $('.main-para__booking-confirmation-msg').hide();
  $('.main-para__booking-confirmation').hide();
  $('.food-hide').hide();
  $('.main-para__room-service-confirmed').hide();
  $('.main-button__confirm-room-service').hide();
  $('.main-div__rooms-hide').hide();
  $('.main-h3__customer-has-booking').hide();
});

$('.nav-button__main-tab').on('click', () => {
  $('.main-hide').hide();
  $('.main-section__main-page').show();
});

$('.nav-button__rooms-tab').on('click', () => {
  $('.main-span__most-rooms-avail').text(admin.hotel.findDateWithMostAvailableRooms());
  $('.main-span__most-pop-book-date').text(admin.hotel.findMostBookedDate())
  $('.main-section__main-page').hide();
  $('.main-section__orders-page').hide();
  $('.main-section__customer-page').hide();
  $('.main-section__rooms-page').show();
  if (admin.currentCustomer !== undefined) {
    $('.rooms-customer-info').show();
    $('.rooms-general-info').hide();
    $('.main-tbody__booking-info').html('');
    let bookingTonight = determineIfCustomerHasBookingTonight(admin.currentDate)
    DOMupdates.displayCustomerBookingInfo(admin.currentCustomer.bookingInfo, admin.currentCustomer.name, bookingTonight);
  } else {
    $('.rooms-customer-info').hide();
    $('.rooms-general-info').show();
  }
})

function determineIfCustomerHasBookingTonight(date) {
  let returnValue = admin.currentCustomer.bookingInfo.filter(booking => {
    return booking.date == date;
  })
  return returnValue.length > 0 ? true : false;
}

$('.nav-button__orders-tab').on('click', () => {
  $('.main-section__main-page').hide();
  $('.main-section__rooms-page').hide();
  $('.main-section__customer-page').hide();
  $('.main-section__orders-page').show();
  if (admin.currentCustomer !== undefined) {
    $('.orders-general-info').hide();
    $('.orders-customer-info').show();
    $('.orders-span__customer-name').text(admin.currentCustomer.name);
  } else {
    $('.orders-general-info').show();
    $('.orders-customer-info').hide();
    let roomServiceInfo = admin.hotel.getDataByDate(admin.currentDate, 'roomServices');
    $('.main-tbody__room-service-info').html('');
    DOMupdates.displayAllOrdersInfo(roomServiceInfo, admin.currentDate);
  }
})

$('.nav-button__customer-tab').on('click', () => {
  $('.main-section__main-page').hide();
  $('.main-section__orders-page').hide();
  $('.main-section__rooms-page').hide();
  $('.main-section__customer-page').show();
})

$('.main-button__existingCustomer-search').on('click', () => {
  event.preventDefault();
  let name = $('.main-input__existingCustomer-search').val();
  admin.instantiateExistingCustomer(name);
  $('.main-input__existingCustomer-search').val('');
})

$('.main-button__create-new-customer').on('click', () => {
  event.preventDefault();
  let name = $('.main-input__create-new-customer').val();
  admin.createNewCustomer(name);
  DOMupdates.displayCurrentCustomerName(name)
  $('.main-input__create-new-customer').val('');
  DOMupdates.displayCustomerOrderInfo(admin.currentCustomer.roomServiceInfo, admin.currentCustomer.name);
  DOMupdates.displayExpendituresOnDate(admin.currentDate, admin.currentCustomer.returnRoomServiceCostOnDate(admin.currentDate), admin.currentCustomer.name);
  DOMupdates.displayTotalExpenditures(admin.currentCustomer.returnAllTimeRoomServiceCost(), admin.currentCustomer.name);
})

$('.main-button__show-booking').on('click', () => {
  event.preventDefault();
  DOMupdates.appendAvailableRooms(admin.hotel.availableRooms, admin.currentDate, 'avail-rooms');
})

$('.booking-tonight-button').on('click', () => {
  event.preventDefault();
  $('.spec-date-back-btn').hide();
  $('.main-button__confirm-booking').hide();
  $('.main-button__room-service-yes').hide();
  $('.main-button__room-service-no').hide();
  $('.rooms-general-info').show();
  $('.main-div__input-wrangler').hide();
  DOMupdates.appendAvailableRooms(admin.hotel.availableRooms, admin.currentDate, 'avail-rooms');
})

$('.main-section__rooms-page').on('click', (e) => {
  if ($(e.target).hasClass('main-td__avail-rooms')) {
    $('.booking-confirm-div').show();
    let clickedElement = $(e.target);
    let correctId = $(clickedElement).attr('data-id');
    let correctRoomInfo = findClickedRoomData(correctId);
    $('.main-button__confirm-booking').show();
    admin.potentialBooking = correctRoomInfo;
    DOMupdates.displayBookingMsg(correctRoomInfo, admin.currentCustomer.name)
  }
})

function findClickedRoomData(correctId) {
  return admin.rooms.find(room => {
    return room.number == correctId;
  })
}

$('.main-button__confirm-booking').on('click', () => {
  if (admin.potentialBooking !== '') {
    $('.main-button__confirm-booking').hide();
    $('.main-button__room-service-yes').show();
    $('.main-button__room-service-no').show();
    admin.createNewBooking(admin.currentCustomer.id, admin.potentialBooking.number);
    DOMupdates.bookingConfirmationMessage(admin.potentialBooking);
    admin.potentialBooking = '';
  } else {
    DOMupdates.displayBookingErrorMsg();
  }
})

$('.main-button__room-service-yes').on('click', () => {
  $('.main-div__rooms-hide').hide();
  $('.main-para__room-service-confirmed').hide();
  $('.main-para__booking-confirmation').hide();
  DOMupdates.displayRoomServices(admin.roomServices);
})

$('.main-section__rooms-page').on('click', (e) => {
  if ($(e.target).is('.main-input__food-type') && $(e.target).prop('checked') == true) {
    let clickedElement = e.target;
    let correctCost = $(clickedElement).closest('tr').attr('data-id');
    let correctRoomServiceInfo = findClickedRoomServiceData(correctCost);
    admin.potentialRoomServices.push(correctRoomServiceInfo);
    addUpRoomServiceCost();
  } else if ($(e.target).is('.main-input__food-type')) {
    let clickedElement = e.target;
    let correctCost = $(clickedElement).closest('tr').attr('data-id');
    subtractRoomServiceCost(correctCost)
  }
})

function findClickedRoomServiceData(correctCost) {
  return admin.roomServices.find(roomService => {
    return roomService.totalCost == correctCost;
  })
}

function addUpRoomServiceCost() {
  let totalCost = admin.potentialRoomServices.reduce((acc, roomService) => {
    acc += roomService.totalCost;
    return acc
  }, 0)
  DOMupdates.displayRoomServiceMessage(totalCost, admin.currentCustomer.name)
}

function subtractRoomServiceCost(cost) {
  let foundIndex = admin.potentialRoomServices.findIndex(roomService => {
    return roomService.totalCost == cost;
  })
  admin.potentialRoomServices.splice(foundIndex, 1)
  let totalCost = admin.potentialRoomServices.reduce((acc, roomService) => {
    acc += roomService.totalCost;
    return acc
  }, 0)
  DOMupdates.displayRoomServiceMessage(totalCost)
}

$('.main-button__confirm-room-service').on('click', () => {
  admin.createNewRoomServiceOrder();
  $('.main-button__confirm-room-service').hide();
  $('.main-para__room-service-confirmed').show();
  $('.main-tbody__customer-info').html('');
  DOMupdates.displayCustomerOrderInfo(admin.currentCustomer.roomServiceInfo, admin.currentCustomer.name);
  DOMupdates.displayExpendituresOnDate(admin.currentDate, admin.currentCustomer.returnRoomServiceCostOnDate(admin.currentDate), admin.currentCustomer.name);
  DOMupdates.displayTotalExpenditures(admin.currentCustomer.returnAllTimeRoomServiceCost(), admin.currentCustomer.name);
  DOMupdates.displayRoomServiceConfirmationMsg();
  let bookingTonight = determineIfCustomerHasBookingTonight(admin.currentDate)
  DOMupdates.displayCustomerBookingInfo(admin.currentCustomer.bookingInfo, admin.currentCustomer.name, bookingTonight);
  admin.hotel.returnPctRoomsOccupied(admin.currentDate);
  admin.hotel.returnRevenueForToday(admin.currentDate);
  admin.hotel.returnNumRoomsAvailable(admin.currentDate);
  $('.food-hide').fadeOut(2000);
  $('.rooms-general-info').hide();
  $('.rooms-customer-info').fadeIn(2000);
})

$('.main-button__specified-date').on('click', ( )=> {
  let inputDate = $('.main-input__specified-date').val()
  $('.booking-confirm-div').hide();
  $('.main-button__room-service-yes').hide();
  $('.main-button__room-service-no').hide();
  admin.hotel.findAvailableRooms(inputDate);
  DOMupdates.appendAvailableRooms(admin.hotel.availableRooms, inputDate, 'avail-rooms2');
  $('.main-div__input-wrangler').hide();
  admin.hotel.availableRooms;
})

$('.main-button__create-tonight').on('click', () => {
  $('.room-content-container').hide();
  $('.main-div__input-wrangler').hide();
  if (admin.currentCustomer !== undefined && admin.currentCustomer.findIfCustomerHasBookingTonight(admin.currentDate, 'bookingInfo')) {
    DOMupdates.displayCustomerHasBookingMsg(admin.currentCustomer.name);
  } else if (admin.currentCustomer !== undefined && admin.currentCustomer.findIfCustomerHasBookingTonight(admin.currentDate, 'bookingInfo') == false) {
    DOMupdates.appendAvailableRooms(admin.hotel.availableRooms, admin.currentDate, 'avail-rooms');
  } else {
    DOMupdates.selectCustomerMsg();
  }
})

$('.main-section__rooms-page').on('click', (e) => {
  if ($(e.target).is('.main-input__radio-filter') && $(e.target).prop('checked') == true) {
    let clickedElement = e.target;
    let attribute = $(clickedElement).attr('value');
    let filteredRooms = admin.hotel.availableRooms.filter(room => {
      return room.roomType === attribute;
    })
    $('.main-tbody__avail-rooms').html('');
    $('.main-div__input-wrangler').hide();
    DOMupdates.appendAvailableRooms(filteredRooms, admin.currentDate, 'avail-rooms');
  }
})

$('.main-button__room-service-date').on('click', () => {
  let inputDate = $('.room-service-label ').val();
  let roomServiceInfo = admin.hotel.getDataByDate(inputDate, 'roomServices')
  $('.main-tbody__room-service-info').html('');
  DOMupdates.displayAllOrdersInfo(roomServiceInfo, inputDate);
  $('.room-service-label ').val('');
})

$('.main-button__room-service-no').on('click', () => {
  $('.main-para__room-service-confirmed').hide();
  $('.main-para__booking-confirmation').hide();
  DOMupdates.displayCustomerOrderInfo(admin.currentCustomer.roomServiceInfo, admin.currentCustomer.name);
  DOMupdates.displayExpendituresOnDate(admin.currentDate, admin.currentCustomer.returnRoomServiceCostOnDate(admin.currentDate), admin.currentCustomer.name);
  DOMupdates.displayTotalExpenditures(admin.currentCustomer.returnAllTimeRoomServiceCost(), admin.currentCustomer.name);
  DOMupdates.displayRoomServiceConfirmationMsg();
  let bookingTonight = determineIfCustomerHasBookingTonight(admin.currentDate);
  DOMupdates.displayCustomerBookingInfo(admin.currentCustomer.bookingInfo, admin.currentCustomer.name, bookingTonight);
  $('.food-hide').fadeOut(2000);
  $('.rooms-general-info').hide();
  $('.rooms-customer-info').fadeIn(2000);
})

$('.spec-date-back-btn').on('click', () => {
  $('.main-div__rooms-hide').hide();
  $('.room-input-container').fadeIn(2000);
  $('.room-content-container').fadeIn(2000);
  $('.main-div__input-wrangler').fadeIn(2000);
  $('.room-input-container-tonight').fadeIn(2000);
})