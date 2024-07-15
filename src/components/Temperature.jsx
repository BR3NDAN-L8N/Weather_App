import React from 'react'
import styles from './Temperature.module.css'
export function Temperature({ temp, feels_like }) {

	const fahrenheit = <span className='fahrenheit-symbol'>&#8457;</span>;
	return (
		<p className={styles.Temperature}>
			{
				temp &&
					typeof temp === 'number' ?
					<span className={styles.temp}>
						{temp} {fahrenheit}
					</span>
					: <span className={styles.temp}>
						{temp.day} {fahrenheit}
					</span>
			}
			{
				feels_like &&
					typeof feels_like === 'number' ?
					<span className={styles.feels_like}>
						(feels: {feels_like})
					</span>
					: <span className={styles.feels_like}>
						(feels: {feels_like.day})
					</span>
			}
			{
				(!temp && !feels_like) &&
				'n/a'
			}
		</p >
	)
}
