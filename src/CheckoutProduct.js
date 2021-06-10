import React, { useEffect } from 'react'
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';
import { motion } from 'framer-motion';

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {

    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        // remove item from basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
        })
    }

    return (
        <motion.div className='checkoutProduct'
            initial={{ y: 500 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
        >
            <img src={image} alt="" className="checkoutProduct__image" />

            <div className="checkoutProduct__info">
                <p className='checkoutProduct__title'>{title}</p>
                <p className="checkoutProduct__price">
                    <small>₹ </small>
                    <strong>{price}</strong>
                </p>

                <div className="checkoutProduct__rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p>🌟</p>
                        ))}
                </div>
                {!hideButton && (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={removeFromBasket}
                    >Remove from Basket</motion.button>
                )}

            </div>
        </motion.div>
    )
}

export default CheckoutProduct
