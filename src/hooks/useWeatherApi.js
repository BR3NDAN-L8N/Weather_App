import React, { useState, useEffect } from 'react'
import useGeocoding from './useGeocoding'
export function useWeatherApi() {
	const [location, getLocation] = useGeocoding()
	const apiKey = import.meta.env.VITE_WEATHER_API_KEY
	const [data, setData] = useState({})

	useEffect(() => {
		getData()
	}, [location])

	async function getData() {
		const url = `http://api.openweathermap.org/data/3.0/onecall?lat=30.489772&lon=-99.771335&units=imperial&appid=${apiKey}`;
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const json = await response.json();
			console.log('json: ', json);
			setData(json)
		} catch (error) {
			console.error(error.message);
		}

	}

	/**
	 * 
	 */
	function setLocation(city, stateCode, countryCode) {
		console.log('setLocation()');
		getLocation(city, stateCode, countryCode)
	}

	return [data, setLocation]
}