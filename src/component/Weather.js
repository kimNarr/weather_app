import React, { useEffect, useState } from 'react'
import { useWeatherQuery } from '../Hooks/getWeather'

function Weather() {
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();
    

    const getCurrentLoaction = () => {
        navigator.geolocation.getCurrentPosition((position)=>{
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            setLat(lat);
            setLon(lon);
        });
    }

    useEffect(()=>{
        getCurrentLoaction();
    }, [])

    // const date = new Date(1739242800*1000 - 32400000);
    // const date = new Date()[Symbol.toPrimitive]('number')*0.001.toFixed(0);
    // console.log(date)


    const {data, isLoading, isError, error} = useWeatherQuery(lat, lon);
    // console.log(data)
    return (
        <div className='inner'>
            <div className='location'>
                
            </div>
        </div>
    )
}

export default Weather
