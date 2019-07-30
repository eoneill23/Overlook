import chai from 'chai';
const expect = chai.expect;

import RoomService from '../src/RoomService.js'

describe('RoomService', () => {
  
	it('should be a function', () => {
		expect(RoomService).to.be.a('function');
	});

})