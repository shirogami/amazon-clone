
import React, { useState, useEffect } from 'react';
import { db } from "./firebase";
import './Orders.css'
import { useStateValue } from "./StateProvider";
import Order from './Order'

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    const fetchData = async () => {
        try {
            if (user) {

                await db.collection('users').doc(user?.uid).collection('orders').orderBy('created', 'desc').onSnapshot(snapshot => (
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ));
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.log('error>>>', error);
        }
    }

    useEffect(() => {

        fetchData();

    }, [user])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders;
