import React from 'react'
import './Product.css';
import { useStateValue } from './StateProvider';
import { motion } from 'framer-motion';

function Product({ id, title, price, image, rating }) {
    const [{ basket }, dispatch] = useStateValue();

    const addToBasket = () => {
        // dispatch the data into the data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            }
        });
    }

    return (
        <motion.div className="product"
            whileHover={{ scale: 1.05 }}
        >
            <div className="product__info">
                <p>{title}</p>
                <p className='product__price'>
                    <span>&#8377;</span>
                    <strong> {price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating).fill().map((_, i) => (
                        <p>🌟</p>
                    ))}
                </div>

            </div>

            <img src={image} alt="" />
            <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                onClick={addToBasket}>Add to Basket</motion.button>

        </motion.div>
    )
}

export default Product
