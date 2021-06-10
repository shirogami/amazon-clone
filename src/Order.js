
import React from 'react';
import './Order.css';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';

function Order({ order }) {

    const currencyConvert = (x) => {
        x = x.toString();
        var lastThree = x.substring(x.length - 3);
        var otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers !== '')
            lastThree = ',' + lastThree;
        let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res;
    }

    return (
        <div className='order'>
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                <small>{order.id}</small>
            </p>
            {order && order.data.basket.map((item) => (
                <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hideButton
                />
            ))}
            <h3 className="order__total">Order Total: ₹{currencyConvert(order.data.amount / 100)}</h3>


        </div>
    )
}

export default Order

