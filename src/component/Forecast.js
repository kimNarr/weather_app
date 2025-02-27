import React, { useEffect, useState } from 'react'
import { useForecastQuery } from '../Hooks/getForecast'


function Forecast({lat, lon, city, setCity}) {

    const {data} = useForecastQuery(lat, lon, city)

    const [dailyData, setDailyData] = useState([])
    const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    const today = new Date();
    
    const fliterDate = (data) => {
        const daily = [];
        data?.list.forEach((item) => {
            const date = item.dt_txt.split(" ")[0];

            let index = daily.findIndex((group)=> group.length > 0 && group[0].dt_txt.startsWith(date));

            if(index !== -1) {
                daily[index].push(item)
            } else {
                daily.push([item])
            }

            setDailyData(daily)
        });


        // let daily = [[],[],[],[],[],[]];
        // let diff = 0;
        // let last = 0;
        // for(let i = 0; i < daily.length; i++) {
        //     for(let j = 0; j < data?.list.length; j++) {
        //         const lastdt = new Date(data?.list[j].dt_txt);
        //         if(lastdt.getDate() - today.getDate() == diff){
        //             daily[i].push(data?.list[j])
        //             last = j;
        //         }
        //     }
        //     diff= new Date(data?.list[last+1]?.dt_txt).getDate() - today.getDate();
        // }
        // setDailyData(daily);
    

        // for(let i=0; i < data?.list.length; i++) {
        //     const dt = Number(data?.list[i].dt_txt.slice(8,10));
        //     if(dt === today) {
        //         daily[0].push(data?.list[i])
        //     } else {
        //         console.log('dt', dt)
        //         console.log('today', today)
        //         daily[(dt-today)].push(data?.list[i])
        //     }
        // }
        // setDailyData(daily);
    }
    
    useEffect(()=>{
        if(data !== undefined) {
            fliterDate(data);
        }
    },[data])

    // const cities = [
    //     {id: 0, name: 'Seoul'},
    //     {id: 1, name: 'Daejeon'},
    //     {id: 2, name: 'Sejong'},
    //     {id: 3, name: 'Daegu'},
    //     {id: 4, name: 'Busan'},
    //     {id: 5, name: 'Gwangju'},
    //     {id: 6, name: 'Ulsan'},
    //     {id: 7, name: 'London'},
    // ]

    return (
        <div className='forecast'>
            <h3>hourly</h3>
            <ul>
                {
                    data?.list.map((item, idx) => {
                        if(idx < 8) {
                            return (
                                <li key={idx}>
                                    <p className='time'>{item?.dt_txt.slice(11,13)}:00</p>
                                    <figure><img src={`./img/icon/${item?.weather[0].main}.svg`} alt={item?.weather[0].main} /></figure>
                                    <p className='temp'>{(item?.main.temp)?.toFixed(1)}°</p>
                                </li>
                            );
                        }
                      })}
                      
            </ul>
            <h3>daily</h3>
            <ul>
                {
                    dailyData?.map((item, idx)=> (
                        <li key={idx}>
                            <p className='time'>{today - new Date(item[0]?.dt_txt).getDate() === 0 ?  "NOW" : week[new Date(item[0]?.dt_txt).getDay()]}</p>
                            <figure><img src={`./img/icon/${item[0]?.weather[0]?.main}.svg`} alt={item[0]?.weather[0]?.main} /></figure>
                            <p className='temp'>{(item[0]?.main?.temp)?.toFixed(1)}°</p>
                        </li>
                    ))
                }
            </ul>
            {/* <h3>cities</h3>
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
            </div> */}
        </div>
    )
}

export default Forecast
