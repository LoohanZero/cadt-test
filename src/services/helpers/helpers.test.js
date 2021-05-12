import '@testing-library/jest-dom/extend-expect';

import { TITLES } from '../enums';
import { checkIfStatusIsIncluded, checkIfUserIsInDB, formatDateUpdate, formatUpdateName, resortData, updateDate } from './helpers';



//----------------------------- TESTING VARIABLES ----------------------------------
const dbDesignsItem = {
	'courses': 250,
	'id': 5,
	'name': '5th Design',
	'status': 'in-progress',
	'updated': '2021-03-28 08:25:41.567611',
	'user_id_last_update': 2,
	'wales': 400
};


const dbSetoutsItem = {
	'id': 19,
	'updated': '2021-11-04 08:44:31.810221',
	'name': '19th Setout',
	'machine_name': 'RSJ_5_1',
	'machine_width': 4000,
	'courses': 1000
};

const users = [
	{
		'id': 1,
		'name': 'Walter Doe'
	},
	{
		'id': 2,
		'name': 'John Doe'
	}
];


//-------------------------------- SETTINGS---------------------------------------

beforeAll (() => {
	jest.useFakeTimers('modern').setSystemTime(new Date('2020-01-01').getTime());
});

afterAll(() => {
	jest.useRealTimers();
});
//----------------------------- CONTEXT HELPERS ----------------------------------

describe('formatDateUpdate works correctly',  () => {
	it('Should return new object with a new string formatDate when passed an object with property updated including a date formatted as YYYY-MM-DD HH:mm:ss.000000', () => {
		const result = formatDateUpdate(dbDesignsItem);
		const newResult = formatDateUpdate(dbSetoutsItem);
	
		expect(result.updated).toEqual('28/03/21');
		expect(newResult.updated).toEqual('4/11/21');
	});

	it('Should return error if no object with a string date in a property updated is sent', () => {

		expect(() => checkIfUserIsInDB()).toThrow(Error);
		expect(() => checkIfUserIsInDB('this is not a date')).toThrow(Error);
		expect(() => checkIfUserIsInDB({ object: 'this is an object' })).toThrow(Error);
		expect(() => checkIfUserIsInDB(null)).toThrow(Error);
		expect(() => checkIfUserIsInDB(undefined)).toThrow(Error);
	});
});

describe('formatUpdateName works correctly',  () => {
	it('Should return add username in object', () => {
		const result = formatUpdateName(dbDesignsItem, users);
	
		expect(result.user_name_last_update).toEqual('John Doe');
	});

	it('Should return error if no object with a string name in a property user_id_last_update of designs is sent', () => {

		expect(() => formatUpdateName()).toThrow(Error);
		expect(() => formatUpdateName('this is not a date')).toThrow(Error);
		expect(() => formatUpdateName({ object: 'this is an object' })).toThrow(Error);
		expect(() => formatUpdateName(null)).toThrow(Error);
		expect(() => formatUpdateName(undefined)).toThrow(Error);
	});
});

describe('resortData works correctly',  () => {
	it('Should return array with property updated sorted by date', () => {
		const dateArray =[ { updated: '2021-04-22' }, { updated: '2018-10-05' }, { updated: '2020-10-10' }, { updated: '2021-04-21' } ];
		const result = resortData(dateArray);
		const sortedResult =[ { updated: '2021-04-22' }, { updated: '2021-04-21' }, { updated: '2020-10-10' }, { updated: '2018-10-05' } ];

		expect(result).toEqual(sortedResult);
		
	});

	it('Should return falsy if no object with a string date in a property updated is sent', () => {
		expect(resortData()).toBeFalsy();
		expect(resortData(null)).toBeFalsy();
		expect(resortData(undefined)).toBeFalsy();
	});

	it('Should return error if no object with a string date in a property updated is sent', () => {

		expect(() => resortData('this is not a date')).toThrow(Error);
		expect(() => resortData({ object: 'this is an object' })).toThrow(Error);
	});
});


//----------------------------- MODAL HELPERS ----------------------------------



describe('checkIfStatusIsIncluded works correctly',  () => {
	it('Should return an array of titles with Status if its not included', () => {
		const result = checkIfStatusIsIncluded(TITLES.DESIGNS);
		const newResult = checkIfStatusIsIncluded(TITLES.SETOUTS);
		const NewTitles = [ ...TITLES.DESIGNS, 'Status' ];
		const NewSetoutTitles =  [ ...TITLES.SETOUTS, 'Status' ];

		expect(result).toHaveLength(6);
		expect(result).toEqual(expect.arrayContaining(NewTitles));
		expect(newResult).toHaveLength(6);
		expect(newResult).toEqual(expect.arrayContaining(NewSetoutTitles));
	});
	
	it('Should return the same array of titles if Status is included', () => {
		const NewTitles = [ 'Status' ];
		const NewSetoutTitles =  [ 'Something', 'Status' ];
		const result = checkIfStatusIsIncluded(NewTitles);
		const newResult = checkIfStatusIsIncluded(NewSetoutTitles);
		

		expect(result).toHaveLength(1);
		expect(result).toEqual(expect.arrayContaining(NewTitles));
		expect(newResult).toHaveLength(2);
		expect(newResult).toEqual(expect.arrayContaining(NewSetoutTitles));
	});

	it('Should return error if no array is sent', () => {

		expect(() => checkIfStatusIsIncluded()).toThrow(Error);
		expect(() => checkIfStatusIsIncluded({ object: 'this is an object' })).toThrow(Error);
		expect(() => checkIfStatusIsIncluded(null)).toThrow(Error);
		expect(() => checkIfStatusIsIncluded(undefined)).toThrow(Error);
	});
});


describe('checkIfUserIsInDB works correctly',  () => {
	it('Should return true when passed a string name included in the users array', () => {
		const result = checkIfUserIsInDB(users, 'John Doe');
		const newResult = checkIfUserIsInDB(users, 'Walter Doe');
	
		expect(result).toBe(true);
		expect(newResult).toBe(true);
	});
	
	it('Should return false when passed a string name not included in users', () => {
		const result = checkIfUserIsInDB(users, 'My Name');
		const newResult = checkIfUserIsInDB(users, 'Maria Juana Sanchita de las Nieves');

		expect(result).toBe(false);
		expect(newResult).toBe(false);
	});

	it('Should return error if no string name is sent', () => {

		expect(() => checkIfUserIsInDB()).toThrow(Error);
		expect(() => checkIfUserIsInDB({ object: 'this is an object' })).toThrow(Error);
		expect(() => checkIfUserIsInDB(null)).toThrow(Error);
		expect(() => checkIfUserIsInDB(undefined)).toThrow(Error);
	});
});


describe('updateDate works correctly',  () => {
	it('Should return todays date and miliseconds in format for database', () => {
		const result = updateDate();
	
		expect(result).toEqual('2020-01-01 01:00:00.000');
		
	});
});