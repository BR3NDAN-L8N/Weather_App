import React from 'react'
import styles from './CarasolList.module.css'
import { Temperature } from './index';
import { minuteToString, hourToString, dayToString, dateToString } from '../utils';

/**
 * @component
 * @param {object} props - props
 * @param {string} props.name - The name of the list
 * @param {object} props.data - The data for the list and list-items
 * @returns {React.ComponentElement}
 * @example 
 * // 'data' looks like this...
 * [
 * 	{
 * 		"dt": 1720580400,
 * 		"temp": 76.05,
 * 		"feels_like": 76.46,
 * 		"pressure": 1015,
 * 		"humidity": 66,
 * 		"dew_point": 63.88,
 * 		"uvi": 0,
 * 		"clouds": 68,
 * 		"visibility": 10000,
 * 		"wind_speed": 13.91,
 * 		"wind_deg": 174,
 * 		"wind_gust": 22.17,
 * 		"weather": [
 * 			{
 * 				"id": 803,
 * 				"main": "Clouds",
 * 				"description": "broken clouds",
 * 				"icon": "04n"
 * 			}
 * 		],
 * 		"pop": 0
 * 	},
 *  ...
 * ]
 */
export function CarasolList({ name, data }) {

	if (data.weather) console.log('data.weather.icon', data.weather.icon);

	return (
		<div className={styles.CarasolList}>

			{/* CARASOL HEADING */}
			<h2 className={styles.heading}>{name.toUpperCase()}</h2>
			{

				// LIST
				<ul className={styles.list}>
					{
						data && data.map((datum, index) => {
							return (

								// - lIST ITEM
								<li className={`${styles.item} blurred-background`} key={index}>

									{/* - - HEADING */}
									<h3>
										{
											name === 'hourly' ?
												hourToString(datum.dt)
												: name === 'daily' ?
													dateToString(datum.dt)
													: minuteToString(datum.dt)
										}
										{
											name === 'hourly' ?
												<div>{dayToString(datum.dt)}</div>
												: name === 'daily' ?
													<div>{dayToString(datum.dt)}</div>
													: <></>
										}
									</h3>

									{/* - - TEMERATURE */}
									<Temperature
										temp={datum.temp}
										feels_like={datum.feels_like}
									/>

									{/* - - WEATHER */}
									<div className={styles.weather}>
										{datum.weather ?
											<p>
												{/* - - - TITLE */}
												<span className={styles.type}>{datum.weather[0].main}</span>
												{
													// - - - ICON
													datum.weather[0].icon &&
													<img src={`https://openweathermap.org/img/wn/${datum.weather[0].icon}.png`} alt="" />
												}
												{/* - - - DESCRIPTION */}
												<span className={styles.description}>
													{datum.weather && datum.weather[0].description}
												</span>
											</p>
											// - - - DATA UNAVAILABLE
											: <p>Weather: n/a</p>
										}
									</div>
								</li>
							)
						})
					}
				</ul>
			}
		</div>
	)
}
