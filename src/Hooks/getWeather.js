import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchWeather = (queryKey) => {
    const lat = queryKey.queryKey[1];
    const lon = queryKey.queryKey[2];
    if(lat && lon) {
        const api_key = '3313832e522f83b469cbd6d38a387a92';
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&lang=kr&units=metric`)
    } else  {
        console("error")
    }
}

export const useWeatherQuery = (lat, lon) => {
    return useQuery({
        queryKey : ['wheather', lat, lon],
        queryFn : (queryKey) => fetchWeather(queryKey),
        select : (data) => {return data.data},
        retry : 1,
        gcTime : 5000*50,
        refetchIntervalInBackground: false
    })
}