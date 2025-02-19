import React, { useState } from 'react'
import '../css/news.css'
import { useNewsQuery } from '../Hooks/getNews'
import { MoonLoader } from 'react-spinners';

function News() {
    const [cate, setCate] = useState('Top');
    const {data, isLoading, isError, error } = useNewsQuery(cate);

    const category = [
        {id: 0, name: 'Top'},
        {id: 1, name: 'business'},
        {id: 2, name: 'entertainment'},
        {id: 3, name: 'general'},
        {id: 4, name: 'health'},
        {id: 5, name: 'science'},
        {id: 6, name: 'sports'},
        {id: 7, name: 'technology'},
    ]

    console.log("news", data)

    if(isLoading) {
    return (
            <div className='news_wrap'>
                <div className='inner'>
                    <div className='news'>
                        <div className='news_title'>
                            <h2>DAILY <span>NEWS</span></h2>
                        </div>
                        <div className='news_category'>
                            {
                                category.map((item)=>(
                                    <button 
                                    type="button" 
                                    key={item.id} 
                                    onClick={()=>setCate(item.name)}
                                    className={cate === item.name ? 'active' : ''}
                                    >{item.name}</button>
                                ))
                            }
                        </div>
                        <div className='loading'>
                            <MoonLoader
                                color="#28303d"
                                cssOverride={{}}
                                loading
                                size={100}
                                speedMultiplier={1}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if(isError) {
        alert(error);
        setCate('Top');
    }
    return (
        <div className='news_wrap'>
            <div className='inner'>
                <div className='news'>
                    <div className='news_title'>
                        <h2>DAILY <span>NEWS</span></h2>
                    </div>
                    <div className='news_category'>
                        {
                            category.map((item)=>(
                                <button 
                                type="button" 
                                key={item.id} 
                                onClick={()=>setCate(item.name)}
                                className={cate === item.name ? 'active' : ''}
                                >{item.name}</button>
                            ))
                        }
                    </div>
                    <div className='news_list'>
                        <ul>
                            {
                                data?.articles.map((item, idx)=>(
                                    <li key={idx}>
                                        <div className='news_img'>
                                            <figure>
                                                <img src={item.urlToImage === null ? './img/news/default.jpg' : item.urlToImage } alt={item.title} />
                                            </figure>
                                        </div>
                                        <div className='news_text'>
                                            <h3 className='title'>{item.title}</h3>
                                            <p className='description'>{item.description}</p>
                                            <p className='time'>{item.publishedAt}</p>
                                            <a className='news_link' href={item.url} target='_blank'>view news</a>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default News
