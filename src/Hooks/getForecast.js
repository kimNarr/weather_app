import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchForecast = (queryData) => {
    const lat = queryData.queryKey[1];
    const lon = queryData.queryKey[2];
    const city = queryData.queryKey[3];
    const api_key = '3313832e522f83b469cbd6d38a387a92';
    if(lat && lon && city === '') {
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    } if (city !== '')  {
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric`)
    }
}

export const useForecastQuery = (lat, lon, city) => {
    return useQuery({
        queryKey : ['forecast', lat, lon, city],
        queryFn : (queryKey) => fetchForecast(queryKey),
        select : (data) => {return data.data},
        retry : 1,
        gcTime : 5000*50,
        staleTime: 4000*50,
        enabled: !!(lat && lon),
    })
}