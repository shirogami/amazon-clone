import React from 'react';
import './Subtotal.css';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';


function SubTotal() {

    const [{ basket }, dispatch] = useStateValue();
    const history = useHistory();

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
        <div className="subtotal">

            <div>
                <p> Subtotal ({basket.length} items): <strong>₹{currencyConvert(getBasketTotal(basket))}</strong></p>
                <small className="subtotal__gift">
                    <input type="checkbox" /> This order contains a gift
                </small>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={e => history.push('./payment')}
            > Proceed to Checkout</motion.button>

        </div>
    )
}

export default SubTotal;

