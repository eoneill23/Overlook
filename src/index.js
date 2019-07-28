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
    console.log(admin)
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
});

$('.nav-button__main-tab').on('click', () => {
  $('.main-hide').hide();
  $('.main-section__main-page').show();
});

$('.nav-button__rooms-tab').on('click', () => {
  $('.main-section__main-page').hide();
  $('.main-section__orders-page').hide();
  $('.main-section__customer-page').hide();
  $('.main-section__rooms-page').show();
})

$('.nav-button__orders-tab').on('click', () => {
  $('.main-section__main-page').hide();
  $('.main-section__rooms-page').hide();
  $('.main-section__customer-page').hide();
  $('.main-section__orders-page').show();
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
  console.log(admin.hotel)
  admin.instantiateExistingCustomer(name);
  $('.main-input__existingCustomer-search').val('');
})

$('.main-button__create-new-customer').on('click', () => {
  event.preventDefault();
  let name = $('.main-input__create-new-customer').val();
  admin.createNewCustomer(name);
  DOMupdates.displayCurrentCustomerName(name)
  $('.main-input__create-new-customer').val('');
})

$('.main-button__show-booking').on('click', () => {
  event.preventDefault();
  DOMupdates.appendAvailableRooms(admin.hotel.availableRooms);
})

$('.main-section__rooms-page').on('click', (e) => {
  if (e.target.closest('.main-td__avail-rooms')) {
    let clickedElement = e.target;
    let correctId = $(clickedElement).attr("data-id")
    let correctRoomInfo = findClickedElementData(correctId)
    admin.potentialBooking = correctRoomInfo;
    console.log('Hello', admin.potentialBooking)
    DOMupdates.displayBookingMsg(correctRoomInfo, admin.currentCustomer.name)
  }
})

function findClickedElementData(correctId) {
  return admin.rooms.find(room => {
    return room.number == correctId;
  })
}

$('.main-button__confirm-booking').on('click', () => {
  if (admin.potentialBooking !== '') {
    admin.createNewBooking(admin.currentCustomer.id, admin.currentDate, admin.potentialBooking.number);
    DOMupdates.bookingConfirmationMessage(admin.potentialBooking)
  } else {
    DOMupdates.displayBookingErrorMsg();
  }
})

$('.main-button__room-service-yes').on('click', () => {
  $('.main-div__rooms-hide').hide();
  // let uniqueFood = returnUniqueFoodItems()
  // console.log(uniqueFood)
  DOMupdates.displayRoomServices(admin.roomServices);
})

// function returnUniqueFoodItems() {
//   return admin.roomServices.reduce((acc, roomService) => {
//     if (!acc.includes(roomService.food)) {
//       acc.push(roomService)
//     }
//     console.log(acc)
//     return acc;
//   }, [])
// }