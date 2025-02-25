import React from 'react'
import { Link } from 'react-router-dom'
import '../css/home.css'
import gsap, { Bounce, Power1 } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

function Home() {

    useGSAP(()=>{
        const tl = gsap.timeline();
        tl.from(".link_box > a", { scale: 0, opacity: 0, duration: 1, ease: Bounce.easeOut})
        .to(".link_box > a", { scale: 1, opacity: 1})
    })
    
    return (
        <div className='home'>
            <div className='inner'>
                
                <div className='link_box'>
                    <Link to={'/weather'}><img src='./img/home/weather.svg' alt='weather'/></Link>
                    <span className='line'></span>
                    <h2>weather app</h2>
                </div>
                <div className='link_box'>
                    <Link to={'/news'}><img src='./img/home/news.svg' alt='news'/></Link>
                    <span className='line'></span>
                    <h2>news app</h2>
                </div>
            </div>
        </div>
    )
}

export default Home
