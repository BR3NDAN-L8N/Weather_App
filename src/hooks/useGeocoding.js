import { useEffect, useState } from 'react'
import CountryCodes from '../data/CountryCodes.json'

export default function useGeocoding(props = { lat: '', long: '' }) {

	const geocodingUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='
	const apiKey = import.meta.env.VITE_WEATHER_API_KEY

	const [location, setLocation] = useState([{ lat: null, lon: null }])
	const [city, setCity] = useState('lady lake')
	const [stateCode, setStateCode] = useState('FL')
	const [countryCode, setCountryCode] = useState('US')
	const [countryName, setCountryName] = useState('United States')
	const [codes, setCodes] = useState(CountryCodes)

	/**
	 * 
	 * @param {string} city 
	 * @param {string} state 
	 * @param {string} country 
	 */
	function getLocation(city, state, country) {
		console.log(`\ngetLocation():\n\tcity: ${city}\n\tstate: ${state}\n\tcountry: ${country}`);
		setCity(city)

		setStateCode('FL')

		const cCode = getCountryCode(country)
		setCountryCode(cCode === null ? 'US' : cCode)

	}

	/**
	 * 
	 * @param {string} cName 
	 */
	function getCountryCode(cName) {
		console.log('getCountryCode()\n\tCountry Name: ', cName);

		const space = ' '

		let code = 'US'
		let isCodeFound = false

		// LOOK UP CODE FOR THE USER'S EXACT INPUT - maybe they spelled it as a proper noun i.e. "United States"
		if (codes[cName]) {
			code = codes[cName]
			isCodeFound = true
			console.log(`\tCode: ${code}`);
		}

		// MODIFY USER'S NAME TO A PROPER NOUN - uppercase 1st letter
		let modifiedName = ''
		if (!isCodeFound) {
			console.log(`\tmodifying name...`);

			const wordArr = cName.split(' ')

			wordArr.forEach((word, index) => {
				// 1st letter
				modifiedName += word.slice(0, 1).toUpperCase()
				// rest of the word
				if (word.length > 1)
					modifiedName += word.slice(1).toLowerCase()
				// add space if there's another word
				if (wordArr.length > index + 1)
					modifiedName += ' '
			});

			console.log(`modified country name: ${modifiedName}`);
		}

		// SEARCH FOR CODE W/MODIFIED COUNTRY NAME
		if (!isCodeFound && codes[modifiedName]) {
			console.log(`found code with modified country name: ${modifiedName}`);
			code = codes[modifiedName]
			isCodeFound = true
			console.log(`\tCode: ${code}`);
		}

		// SET CODE IF FOUND AND EXIT
		if (isCodeFound) {
			return codes[code]
		}

		// when all else fails - LOOP THE KEYS FOR POTENTIAL MATCHES
		const matches = []
		Object.keys(codes).forEach(key => {
			if (key.includes(modifiedName)) matches.push(key)
		})

		if (matches.length === 1) return codes[code]
		else {
			console.log('Matches: ', matches);
			return null
		}
	}


	return [location, getLocation]
}