import React from 'react'
import Home from './component/Home'
import Weather from './component/Weather'
import News from './component/News'
import './App.css'
import { Route, Routes, Link, useLocation } from 'react-router-dom'


function App() {
    const location = useLocation();
    return (
        <div className='app'>
            <div className={location.pathname === '/' ? 'nav' : 'nav view'}>
                <div className='inner'>
                    <Link to={'/'}><img src='../img/home/home.svg' alt='home'/></Link>
                    <Link to={'/weather'}><img src={location.pathname === '/weather' ? '../img/home/weather_fill.svg' : '../img/home/weather.svg'} alt='weather'/></Link>
                    <Link to={'/news'}><img src={location.pathname === '/news' ? '../img/home/news_fill.svg' : '../img/home/news.svg'} alt='news'/></Link>
                </div>
            </div>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/news' element={<News />}/>
                <Route path='/weather' element={<Weather />}/>
            </Routes>
        </div>
    )
}

export default App
