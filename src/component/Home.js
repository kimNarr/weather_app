import React from 'react'
import { Link } from 'react-router-dom'
import '../css/home.css'

function Home() {
    
    return (
        <div className='home'>
            <div className='inner'>
                <Link to={'/weather'}><img src='./img/home/weather.svg' alt='weather'/></Link>
                <Link to={'/news'}><img src='./img/home/news.svg' alt='news'/></Link>
            </div>
        </div>
    )
}

export default Home
