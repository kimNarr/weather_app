import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchForecast = (queryData) => {
    const lat = queryData.queryKey[1];
    const lon = queryData.queryKey[2];
    const city = queryData.queryKey[3];
    if(lat && lon && city === '') {
        const api_key = '3313832e522f83b469cbd6d38a387a92';
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&lang=kr&units=metric`)
    } else  {
        console("error")
    }
}

export const useForecastQuery = (lat, lon, city) => {
    return useQuery({
        queryKey : ['forecast', lat, lon, city],
        queryFn : (queryKey) => fetchForecast(queryKey),
        select : (data) => {return data.data},
        retry : 1,
        gcTime : 5000*50,
        refetchIntervalInBackground: false
    })
}