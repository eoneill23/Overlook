import $ from 'jquery';
import './css/base.scss';

import Hotel from '../src/Hotel.js'
// import Administrator from '../src/Administrator.js';
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

var hotel;
let combinedData = {'customerData': {}, 'roomData': {}, 'bookingData': {}, 'roomServiceData': {}}

Promise.all([customerData, roomData, bookingData, roomServiceData])
  .then((values) => {
    combinedData['customerData'] = values[0].users;
    combinedData['roomData'] = values[1].rooms;
    combinedData['bookingData'] = values[2].bookings;
    combinedData['roomServiceData'] = values[3].roomServices;
    hotel = new Hotel(combinedData)
    console.log(hotel)
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
