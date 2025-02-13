import React from 'react'
import { useForecastQuery } from '../Hooks/getForecast'

function Forecast({lat, lon, city, setCity}) {

    const {data, isLoading, isError, error} = useForecastQuery(lat, lon, city)
    console.log("forecast",data)

    const cities = [
        {id: 0, name: 'Seoul'},
        {id: 1, name: 'Daejeon'},
        {id: 2, name: 'Sejong'},
        {id: 3, name: 'Daegu'},
        {id: 4, name: 'Busan'},
        {id: 5, name: 'Gwangju'},
        {id: 6, name: 'Ulsan'},
        {id: 7, name: 'Gangneung'},
    ]


    return (
        <div className='forecast'>
            <h3>hourly</h3>
            <ul>
                {
                    data?.list.map((item, idx) => {
                        if(idx < 8) {
                            return (
                                <li key={idx}>
                                    <p className='time'>{item.dt_txt.slice(11,13)}:00</p>
                                    <figure><img src={`./img/icon/${item.weather[0].main}.svg`} alt={item.weather[0].main} /></figure>
                                    <p className='temp'>{item.main.temp}°</p>
                                </li>
                            );
                        }
                      })}
                      
            </ul>
            <h3>cities</h3>
            <div className='cities'>
                {
                    cities.map((item, idx)=>(
                        <button 
                        type='button' 
                        key={idx} 
                        onClick={()=>{setCity(item.name)}}
                        className={item.name === data?.city.name ? 'active' : ''}
                        >{item.name}</button>
                    ))
                }
            </div>
        </div>
    )
}

export default Forecast
