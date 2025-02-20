import React, { useEffect, useState } from 'react'
import { useWeatherQuery } from '../Hooks/getWeather'
import { MoonLoader } from 'react-spinners';
import Header from './Header';
import Forecast from './Forecast';
import '../css/weather.css'

function Weather() {
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();
    const [city, setCity] = useState('');

    
    const getCurrentLoaction = () => {
        navigator.geolocation.getCurrentPosition((position)=>{
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            setLat(lat);
            setLon(lon);
        });
    }

    const {data, isLoading, isError, error} = useWeatherQuery(lat, lon, city);

    console.log("weather",data)

    const dayNight = data?.weather[0].icon.slice(2,3)
    


    useEffect(()=>{
        getCurrentLoaction();
    }, [])


    if(isLoading) {
        return (
            <div className='loading'>
                <MoonLoader
                    color="#28303d"
                    cssOverride={{}}
                    loading
                    size={100}
                    speedMultiplier={1}
                />
            </div>
        )
    }

    if(isError) {
        alert(error.response.data.message)
        setCity('');
    }


    return (
        <div className={dayNight === 'd' ? 'weather_wrap' : 'weather_wrap night'}>
            <div className='inner'>
                <Header data={data} setCity={setCity}/>
                <div className='contents'>
                    <div className='main_info'>
                        <div className='main_weather'>
                            <figure>
                                <img src={`./img/icon/${data?.weather[0].main}.svg`} alt={data?.weather[0].main} />
                            </figure>
                            <p className='desc'>{data?.weather[0].description}</p>
                            <p className='temp'>{data?.main.temp}<span>℃</span></p>
                        </div>
                    </div>
                    <div className='sub_info'>
                        <div className='sub_weather'>
                            <div className='weather'>
                                <h3>weather</h3>
                                <ul>
                                    <li>
                                        <figure><img src="./img/icon/humidity.svg" alt="humidity" /></figure>
                                        <p>{data?.main.humidity}%</p>
                                    </li>
                                    <li>
                                        <figure><img src="./img/icon/temperature.svg" alt="temperature" /></figure>
                                        <p>{data?.main.temp}℃</p>
                                    </li>
                                    <li>
                                        <figure><img src="./img/icon/air.svg" alt="air" /></figure>
                                        <p>{data?.wind.speed}</p>
                                    </li>
                                </ul>
                            </div>
                            <Forecast lat={lat} lon={lon} city={city} setCity={setCity}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather
