import React, { useState } from 'react'

function Header({data, setCity}) {
    const [viewSearch, setViewSearch] = useState(false);
    const [inputCity, setInputCity] = useState('');

    console.log('inputCity', inputCity)

    const searchSubmit = (e) => {
        e.preventDefault();
        setCity(inputCity);
        setInputCity('');
        setViewSearch(false);
    }

    return (
        <header>
            <div className='inner'>
                <div className='title_box'>
                    <div className='text'>
                        <h2>{data?.name}</h2>
                        <p>today <span>2025.02.12</span></p>
                    </div>
                    <div className='icon' onClick={()=>setViewSearch(true)}>
                        <img src="./img/icon/search.svg" alt="search" />
                    </div>
                </div>
                <div className='search_box' style={viewSearch === false? {display:'none'} : {display:'block'}}>
                    <form onSubmit={searchSubmit}>
                        <input 
                        type="text" 
                        placeholder='City Search'
                        value={inputCity}
                        onChange={(e)=>setInputCity(e.target.value)}
                        />
                        <button onSubmit={searchSubmit}>
                            <img src="./img/icon/search.svg" alt="search" />
                        </button>
                    </form>
                    <button type="button" onClick={()=>setViewSearch(false)}>
                        <img src="./img/icon/cancel.svg" alt="close" />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
