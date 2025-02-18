import React from 'react'
import '../css/news.css'
import { useNewsQuery } from '../Hooks/getNews'
import { MoonLoader } from 'react-spinners';

function News() {
    const {data, isLoading, isError, error} = useNewsQuery();

    console.log(data)

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
    return (
        <div className='news_wrap'>
            <div className='inner'>
                <div className='news'>
                    <ul>
                        {
                            data.articles?.map((item, idx)=>(
                                <li key={idx}>
                                    <div className='news_img'>
                                        <figure>
                                            <img src={item.urlToImage} alt={item.title} />
                                        </figure>
                                    </div>
                                    <div className='news_text'>
                                        <h2 className='title'>{item.title}</h2>
                                        <p className='description'>{item.description}</p>
                                        <p className='time'>{item.publishedAt}</p>
                                        <a href={item.url} target='_blank'>view news</a>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default News
