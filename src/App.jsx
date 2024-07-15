import { useEffect, useState } from 'react'
import './App.css'
import ExampleResponse_LatLon_Imperial from './data/ExampleResponse_LatLon_Imperial.json'
import { useWeatherApi } from './hooks/useWeatherApi'
import { CarasolList, Temperature } from './components'
import { minuteToString, monthToString } from './utils'

function App() {

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

		console.log('feels_like: ', data.current.feels_like);
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
			{/* LOCATION FORM */}
			<p>Country Code: {countryName}</p>
			<form action="#">
				<label htmlFor="countryCode">Country Code:</label>
				<input id='countryCode' type="text" onChange={e => handleOnChange_countryCode(e)} />
				<button onClick={e => handleOnClick_submitLocationData(e)}>Submit</button>
			</form>

			<div className='current-weather-container'>

				{/* DATE */}
				<h2 className='date'>
					{currentDate && monthToString(currentDate.getMonth())}
					-{currentDate && currentDate.getDate()}
					-{currentDate && currentDate.getYear() - 100} {/* years after 1999 are given weird (124 === 2024) so -100 removes the leading 1 */}
				</h2>

				{/* SUNRISE / SUNSET */}
				<div className='sunrise-sunset'>
					{(data.current.sunrise && data.current.sunset) &&
						<>
							<h3>Sunrise & Sunset</h3>
							<p>
								{minuteToString(data.current.sunrise)}<br />
								{minuteToString(data.current.sunset)}
							</p>
						</>
					}
				</div>

				{/* // TEMPERATURE */}
				<div className='temperature'>
					<h3>Temp</h3>
					{
						(data.current.temp && data.current.feels_like) &&
						<Temperature
							temp={data.current.temp}
							feels_like={data.current.feels_like}
						/>
					}
				</div>

				{/* CLOUDINESS */}
				<div className='cloudiness'>
					<h3>Coudiness</h3>
					{data.current.clouds}%
				</div>

				{/* ULTRA VIOLET INDEX */}
				<div className='uv-index'>
					<h3>UV Index</h3>
					{
						data.current.uvi <= 2 ? `Low ${data.current.uvi}`
							: data.current.uvi <= 5 ? `Moderate ${data.current.uvi}`
								: data.current.uvi <= 7 ? `High ${data.current.uvi}`
									: data.current.uvi <= 10 ? `Very High ${data.current.uvi}`
										: `Extreme ${data.current.uvi}`
					}
				</div>

				{/* VISIBILITY (api is in kilimeters) */}
				<div className='visibility'>
					<h3>Visibility</h3>
					{data.current.visibility / 1000} km
				</div>

				{/* WIND */}
				<div className='wind'>
					<h3>Wind</h3>
					<div>Speed / Gusts</div>
					{data.current.wind_speed} / {data.current.wind_gust} mph
				</div>

				{/* RAIN / SNOW */}
				<div className='rain-snow'>
					<h3>Rain/Snow</h3>
					{
						data.current.rain ? `Rain ${data.current.rain} mm/h`
							: data.current.snow ? `Snow ${data.current.snow} mm/h`
								: ` N/A`
					}
				</div>
			</div >

			{/*  */}
			< CarasolList
				name='hourly'
				data={data.hourly && data.hourly}
			/>

			<CarasolList
				name='daily'
				data={data.daily && data.daily}
			/>
		</>
	)
}

export default App
