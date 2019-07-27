import $ from 'jquery';

const DOMupdates = {

  displayDate(date) {
    $('.body-span__date-today').text(date)
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
  // main-span__rooms-available

}

export default DOMupdates;