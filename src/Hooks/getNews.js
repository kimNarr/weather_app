import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchNews = (queryData) => {
    const api_key = 'pub_64515215181728cbe7be384f9a473ecddce17';
    const cate = queryData.queryKey[1];
    if(cate === 'All') {
      return axios.get(`https://newsdata.io/api/1/latest?country=us&apikey=${api_key}`)
    } else {
      return axios.get(`https://newsdata.io/api/1/latest?country=us&category=${cate}&apikey=${api_key}`)
    }
}

export const useNewsQuery = (cate) => {
    return useQuery({
        queryKey : ['news', cate],
        queryFn : (queryKey) => fetchNews(queryKey),
        select : (data) => {return data.data},
        retry : 1,
        gcTime : 5000*50,
        staleTime: 4000*50,
    })
}
