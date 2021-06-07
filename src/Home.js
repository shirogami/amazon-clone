import React from 'react';
import Product from './Product';
import './Home.css';

function Home() {
    return (
        <div className='home'>
            <div className="home__container">
                <img className="home__image"
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                    alt=""
                />

                {/* Multiple product Rows */}

                <div className="home__row">
                    <Product
                        id="12321341"
                        title="New Apple iPhone 12 Pro Max (128GB) - Pacific Blue"
                        price={124700}
                        rating={5}
                        image="https://images-eu.ssl-images-amazon.com/images/I/41N9-hbLe0L._SY445_SX342_QL70_FMwebp_.jpg"
                    />
                    <Product
                        id="49538094"
                        title="2020 Apple MacBook Pro (13-inch, Apple M1 chip with 8‑core CPU and 8‑core GPU, 8GB RAM, 512GB SSD) - Space Grey"
                        price={134999}
                        rating={5}
                        image="https://images-na.ssl-images-amazon.com/images/I/71an9eiBxpL._SL1500_.jpg"
                    />
                    <Product
                        id="3254354345"
                        title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
                        price={44999}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
                    />
                    <Product
                        id="3254354542"
                        title="New Apple Watch SE (GPS, 40mm) - Silver Aluminium Case with White Sport Band"
                        price={30000}
                        rating={5}
                        image="https://images-na.ssl-images-amazon.com/images/I/71zaMJs757L._SL1500_.jpg"
                    />
                </div>

                <div className="home__row">
                    <Product
                        id="4903850"
                        title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
                        price={199.99}
                        rating={3}
                        image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
                    />
                    <Product
                        id="23445930"
                        title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                        price={98.99}
                        rating={5}
                        image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
                    />

                </div>

                <div className="home__row">
                    <Product
                        id="90829332"
                        title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
                        price={1094.98}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
                    />
                </div>

            </div>
        </div>
    )
}

export default Home
