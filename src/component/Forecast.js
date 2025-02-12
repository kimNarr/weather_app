import React from 'react'
import { useForecastQuery } from '../Hooks/getForecast'

function Forecast({lat, lon, city}) {

    const {data, isLoading, isError, error} = useForecastQuery(lat, lon, city)
    console.log("forecast",data)

    return (
        <div className='forecast'>
            <h3>hourly</h3>
            <ul>
                <li>
                    
                </li>
            </ul>
            <h3>daily</h3>
            <ul>
                <li></li>
            </ul>
        </div>
    )
}

export default Forecast
