import React, { useState } from 'react'
import '../css/news.css'
import { useNewsQuery } from '../Hooks/getNews'
import { MoonLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';


function News() {
    const [cate, setCate] = useState('All');
    const navigate = useNavigate();
    const {data, isLoading, isError, error } = useNewsQuery(cate);

    const category = [
        {id: 0, name: 'All'},
        {id: 1, name: 'top'},
        {id: 2, name: 'sports'},
        {id: 3, name: 'technology'},
        {id: 4, name: 'business'},
        {id: 5, name: 'science'},
        {id: 6, name: 'entertainment'},
        {id: 7, name: 'health'},
        {id: 8, name: 'world'},
        {id: 9, name: 'politics'},
        {id: 10, name: 'environment'},
        {id: 11, name: 'food'},
    ]

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
        navigate('/');
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
                                data?.results.map((item, idx)=>(
                                    <li key={idx}>
                                        <div className='news_img'>
                                            <figure>
                                                <img src={item.image_url === null ? './img/news/default.jpg' : item.image_url } alt={item.title} />
                                            </figure>
                                        </div>
                                        <div className='news_text'>
                                            <h3 className='title'>{item.title}</h3>
                                            <p className='description'>{item.description}</p>
                                            <p className='time'>{item.publishedAt}</p>
                                            <a className='news_link' href={item.link} target='_blank'>view news</a>
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
