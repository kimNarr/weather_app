import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchWeather = (queryData) => {
    const lat = queryData.queryKey[1];
    const lon = queryData.queryKey[2];
    const city = queryData.queryKey[3];
    const api_key = '3313832e522f83b469cbd6d38a387a92';
    if(lat && lon && city === '') {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&lang=kr&units=metric`)
    } if (city !== '')  {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&lang=kr&units=metric`)
    }
}

export const useWeatherQuery = (lat, lon, city) => {
    return useQuery({
        queryKey : ['wheather', lat, lon, city],
        queryFn : (queryKey) => fetchWeather(queryKey),
        select : (data) => {return data.data},
        retry : 1,
        gcTime : 5000*50,
        refetchIntervalInBackground: false
    })
}