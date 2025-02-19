import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchNews = (queryData) => {
    const api_key = 'dfe1a4e230db424b8f71cc15da280ae5';
    const cate = queryData.queryKey[1];
    if(cate === 'Top') {
      return axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${api_key}`)
    } else {
      return axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${cate}&apiKey=${api_key}`)
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
