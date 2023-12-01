// OrderTracking.js
import React, { useState, useEffect } from 'react';
import './OrderTracking.css';
import { FaTruckMoving, FaCheck } from 'react-icons/fa';
import ManagerSidebar from '../ManagerSidebar/ManagerSidebar';
import { fetchOrders } from '../../../../../services/orderservice';

function OrderTracking() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders().then(fetchedOrders => {
            if (fetchedOrders) {
                setOrders(fetchedOrders);
            }
        });
    }, []);


    return (
        <div className="order-tracking-container">
            <ManagerSidebar />
            <h1 className="tracking-title">Order Tracking</h1>
            <div className="orders-list">
                {orders.map(order => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <h2>Order #{order.id}</h2>
                            <p className="order-date">{order.date}</p>
                        </div>
                        <div className="order-info">
                            <p>Customer: {order.name}</p>
                            <p className={`order-status`}>Status: {order.status}</p>
                        </div>
                        <div className="order-actions">
                            <button className="action-btn" >
                                <FaTruckMoving /> Processing
                            </button>
                            <button className="action-btn" >
                                <FaTruckMoving /> On its way
                            </button>
                            <button className="action-btn" >
                                <FaCheck /> Completed
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderTracking;
