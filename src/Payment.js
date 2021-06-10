import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';


function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    // whenever we change items in basket , useEfeect is requested
    // which can update stripe clientSecret which allows the 
    // updated amount to charge that customer accordingly
    /* useEffect is very imprtant function */

    useEffect(() => {
        // generate the special stripe secret which allows
        // us to charge a customer, it also keep listening to 
        // items present in basket/ or any change in basket  

        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // stripe expects the total in currencies subunits 
                // means (not rupee in paisa, not dollar in cents)

                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();

    }, [basket])

    console.log('the secret is >>>>', clientSecret);

    const handleSubmit = async (event) => {
        // do all stripe stuff
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // reponse is destructured into paymentIndex

            // paymentIntent is payment confirmation

            db.collection('users').doc(user?.uid)
                .collection('orders').doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders');

        })


    }


    const handleChange = (event) => {
        // listen for any change in cardElement and display any 
        // errors as the customer types their card details

        setDisabled(event.empty);
        setError(event.error ? event.error.message : '');

    }

    return (

        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout(
                     <Link to='/checkout'>{basket ? basket.length : 0} items</Link>
                    )
                </h1>

                {/* Payment-section delivery address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user ? user.email : ''}</p>
                        <p>123 Gwalior</p>
                        <p>MP India</p>

                    </div>
                </div>

                {/* Payment section- Review Items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and delivery</h3>

                    </div>
                    <div className="payment__items">
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

                {/* Payment section / Payment Method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>

                    <div className="payment__details">
                        {/* Stripe is used for payment */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <p>
                                                {/* Part of the homework */}
                                    Subtotal ({basket.length} items): <strong>{value}</strong>
                                            </p>

                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                />

                                <button disabled={processing || disabled
                                    || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>

                                </button>

                            </div>
                            {/* Error */}
                            {error && <div> {error} </div>}

                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment;
