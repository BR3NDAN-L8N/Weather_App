export function monthToString(monthIndex) {
	switch (monthIndex) {
		case 0:
			return 'Jan'
		case 1:
			return 'Feb'
		case 2:
			return 'Mar'
		case 3:
			return 'Apr'
		case 4:
			return 'May'
		case 5:
			return 'Jun'
		case 6:
			return 'Jul'
		case 7:
			return 'Aug'
		case 8:
			return 'Sep'
		case 9:
			return 'Oct'
		case 10:
			return 'Nov'
		case 11:
			return 'Dec'
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
		case 0: return 'Sunday'
		case 1: return 'Monday'
		case 2: return 'Tuesday'
		case 3: return 'Wednesday'
		case 4: return 'Thursday'
		case 5: return 'Friday'
		case 6: return 'Saturday'
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