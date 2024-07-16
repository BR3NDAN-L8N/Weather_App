import { DAYS_OF_WEEK, MONTHS_OF_YEAR } from "../constants"

export function monthToString(monthIndex) {
	switch (monthIndex) {
		case 0:
			return MONTHS_OF_YEAR.JANUARY
		case 1:
			return MONTHS_OF_YEAR.FEBRUARY
		case 2:
			return MONTHS_OF_YEAR.MARCH
		case 3:
			return MONTHS_OF_YEAR.APRIL
		case 4:
			return MONTHS_OF_YEAR.MAY
		case 5:
			return MONTHS_OF_YEAR.JUNE
		case 6:
			return MONTHS_OF_YEAR.JULY
		case 7:
			return MONTHS_OF_YEAR.AUGUST
		case 8:
			return MONTHS_OF_YEAR.SEPTEMBER
		case 9:
			return MONTHS_OF_YEAR.OCTOBER
		case 10:
			return MONTHS_OF_YEAR.NOVEMBER
		case 11:
			return MONTHS_OF_YEAR.DECEMBER
		default:
			return null
	}
}

/**
 * Takes the seconds since epoch (given from WeatherAPI) and returns 12h formated time
 *
 * 0 = midnight, 23 = 11pm
 *
 * @param {Number} hour 
 */
export function hourToString(hour) {
	const hourNum = new Date(hour * 1000).getHours()

	if (hourNum === 0) return '12:00 AM'

	if (hourNum <= 12) return hourNum + ':00 AM'

	return (hourNum - 12) + ':00 PM'
}

/**
 * Takes the seconds since epoch (given from WeatherAPI) and returns the time formated in minutes
 *
 * 0 = 
 *
 * @param {Number} hour 
 */
export function minuteToString(epochSecs) {
	const minNum = new Date(epochSecs * 1000).getMinutes()
	const hourNum = new Date(epochSecs * 1000).getHours()

	return `${hourNum}:${minNum} ${hourNum < 12 ? 'AM' : 'PM'}`

	// if (minNum === 0) return '12:00 AM'

	// if (minNum <= 12) return minNum + ':00 AM'

	// return (minNum - 12) + ':00 PM'
}

/**
 * Takes the seconds since epoch (given from WeatherAPI) and returns the day formated
 *
 * 0 = 1st of the month
 *
 * @param {Number} hour 
 */
export function dateToString(epochSecs) {
	const date = new Date(epochSecs * 1000)

	return `${date.getMonth()}/${date.getDate()} `

	// if (hourNum === 0) return '12:00 AM'

	// if (hourNum <= 12) return hourNum + ':00 AM'

	// return (hourNum - 12) + ':00 PM'
}

export function dayToString(epochSecs) {
	const date = getDate(epochSecs)

	// console.log('date.getDat');

	switch (date.getDay()) {
		case 0: return DAYS_OF_WEEK.SUNDAY
		case 1: return DAYS_OF_WEEK.MONDAY
		case 2: return DAYS_OF_WEEK.TUESDAY
		case 3: return DAYS_OF_WEEK.WEDNESDAY
		case 4: return DAYS_OF_WEEK.THURSDAY
		case 5: return DAYS_OF_WEEK.FRIDAY
		case 6: return DAYS_OF_WEEK.FRIDAY
		default: return 'Unknownday'
	}
}

/**
 * Returns a Date object based on the epochSecs passed in
 * @param {number} epochSecs - epoch in Seconds 
 * @returns {Date}
 */
function getDate(epochSecs) {
	// multiply by 1000 to turn the Seconds into MiliSeconds
	return new Date(epochSecs * 1000)
}