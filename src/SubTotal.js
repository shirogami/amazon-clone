import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';


function SubTotal() {

    const [{ basket }, dispatch] = useStateValue();
    const history = useHistory();
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            {/* Part of the homework */}
              Subtotal ({basket.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
            </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)} // Part of the homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
            />
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={e => history.push('./payment')}
            > Proceed to Checkout</motion.button>

        </div>
    )
}

export default SubTotal;
