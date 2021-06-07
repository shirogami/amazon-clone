import React from 'react';
import './Checkout.css';
import SubTotal from './SubTotal';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
function Checkout() {

    const [{ basket, user }, dispatch] = useStateValue();
    return (
        <div className='checkout'>
            <div className="checkout__left">
                <img
                    className='checkout__ad'
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/CEPC/Clearance/May21/D23947948_IN_CEPC_Clearance-store_May21_rush_1500x300.jpg"
                    alt=''
                />

                <div>
                    <h3>Hello, {user ? user.email : ''}</h3>
                    <h2 className="checkout__title"
                    >Your Shopping Basket</h2>

                    {basket.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />

                    ))}

                </div>

            </div>

            <div className="checkout__right">
                <SubTotal />
            </div>
        </div>
    )
}

export default Checkout
