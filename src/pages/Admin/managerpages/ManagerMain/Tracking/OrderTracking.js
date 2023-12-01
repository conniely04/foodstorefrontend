import React, { useState, useEffect } from 'react';
import './OrderTracking.css';
import { FaTruckMoving, FaCheck, FaTimesCircle } from 'react-icons/fa';
import ManagerSidebar from '../ManagerSidebar/ManagerSidebar';

function OrderTracking() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders().then(data => setOrders(data));
    }, []);

    const updateOrderStatus = (orderId, newStatus) => {
        changeOrderStatus(orderId, newStatus).then(() => {
            setOrders(orders.map(order => {
                if (order.id === orderId) {
                    return { ...order, status: newStatus };
                }
                return order;
            }));
        });
    };

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
                            <p>Customer: {order.customerName}</p>
                            <p className={`order-status ${order.status.toLowerCase()}`}>Status: {order.status}</p>
                        </div>
                        <div className="order-actions">
                            <button className="action-btn" onClick={() => updateOrderStatus(order.id, 'Processing')}>
                                <FaTruckMoving /> Processing
                            </button>
                            <button className="action-btn" onClick={() => updateOrderStatus(order.id, 'On its way')}>
                                <FaTruckMoving /> On its way
                            </button>
                            <button className="action-btn" onClick={() => updateOrderStatus(order.id, 'Completed')}>
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

// Mock functions (replace with real API calls)
const fetchOrders = async () => {
    // Sample data
    return [
        { id: 1, date: '2023-03-15', customerName: 'John Doe', status: 'Pending' },
        // Add more orders here
    ];
};

const changeOrderStatus = async (orderId, newStatus) => {
    console.log(`Updating order ${orderId} to ${newStatus}`);
    return Promise.resolve();
};
