import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchNews = () => {
    const api_key = 'dfe1a4e230db424b8f71cc15da280ae5';
    return axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${api_key}`)
}

export const useNewsQuery = () => {
    return useQuery({
        queryKey : ['news'],
        queryFn : () => fetchNews(),
        select : (data) => {return data.data},
        retry : 1,
        gcTime : 5000*50,
        staleTime: 4000*50,
    })
}