import { useEffect, useState } from 'react'
import './App.css'
import CountryCodes from './data/CountryCodes.json'
import ExampleResponse_LatLon_Imperial from './data/ExampleResponse_LatLon_Imperial.json'
import { useWeatherApi } from './hooks/useWeatherApi'

function App() {

	const geocodingUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='
	const apiKey = import.meta.env.VITE_WEATHER_API_KEY
	const fahrenheit = <span className='fahrenheit-symbol'>&#8457;</span>;

	// TODO: uncomment below to get api data (also check the handleOnClick_submitLocationData for another line to uncomment)
	// const [data, setLocation] = useWeatherApi()
	const data = ExampleResponse_LatLon_Imperial
	const [countryName, setCountryName] = useState('')

	const [currentDate, setCurrentDate] = useState()

	useEffect(() => {
		if (data.current.dt) {
			console.log('data.currnet.dt: ', data.current.dt);
			setCurrentDate(new Date(data.current.dt * 1000))  // multiply becase we get seconds and need to pass milliseconds
		}
	}, [data])
	console.log(currentDate);
	function handleOnChange_countryCode(e) {
		// console.log(e.target.value);

		setCountryName(e.target.value)
	}

	function handleOnClick_submitLocationData(e) {
		console.log('e', e);
		// TODO: uncomment below to get api data (also check the useWeatherApi hook called with the useState stuff)
		// setLocation('lady lake', 'fl', 'united states')
	}


	return (
		<>
			<p>Country Code: {countryName}</p>
			<form action="#">
				<label htmlFor="countryCode">Country Code:</label>
				<input id='countryCode' type="text" onChange={e => handleOnChange_countryCode(e)} />
				<button onClick={e => handleOnClick_submitLocationData(e)}>Submit</button>
			</form>

			<div className='date'>
				{currentDate && currentDate.getMonth()}
				-{currentDate && currentDate.getDate()}
				-{currentDate && currentDate.getYear() - 100} {/* years after 1999 are given weird (124 === 2024) so -100 removes the leading 1 */}
			</div>

			<div className='sunrise-sunset'>
				{(data.current.sunrise && data.current.sunset) &&
					<p>Sunrise at {
						new Date(data.current.sunrise * 1000).getHours()
					}:{
							new Date(data.current.sunrise * 1000).getMinutes()
						}, Sunset at {
							new Date(data.current.sunset * 1000).getHours()
						}:{
							new Date(data.current.sunset * 1000).getMinutes()
						}</p>
				}
			</div>
			<div className='temperature'>
				{
					data.current.temp &&
					<p>
						Temp: {data.current.temp} {fahrenheit}
					</p>
				}

				{
					data.current.temp &&
					<p>
						Feels: {data.current.feels_like} {fahrenheit}
					</p>
				}
			</div>

			<div className='hourly'>
				{
					<ul className='hourly-list'>
						{
							data.hourly && data.hourly.map((hour, index) => {
								return (
									<li className='hourly-item' key={index}>
										<h3>{new Date(hour.dt * 1000).getHours()}</h3>
										<p className='weather-temperature'>
											Temp: {hour.temp} {fahrenheit}
											<span className='temperature-feels-like'>
												(feels: {hour.feels_like} {fahrenheit})
											</span>
										</p>
										<p className='weather-description'>
											{hour.weather.main} - <span className='description'>{hour.weather.description}</span>
										</p>
									</li>
								)
							})
						}
					</ul>
				}
			</div>
		</>
	)
}

export default App
