import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client'
import api from '../../services/api'

import './styles.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]); //espera um array
    const [requests, setRequests] = useState([]);
    
    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id }
    }), [user_id]);

    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        })
    }, [requests, socket]);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: {
                    user_id
                }
            });
            setSpots(response.data);
        }
        loadSpots();
        //irá executar apenas 1 vez
    }, []);

    return (
        <>
            <ul className="notification">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <b>{request.user.email}</b> está solicitando uma reserva em <b>{request.spot.company}</b> para a data: <b>{request.date}</b>
                        </p>
                        <button>ACEITAR</button>
                        <button>REJEITAR</button>

                    </li>
                ))}
            </ul>
            <ul className='spot-list'>
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo Spot</button>
            </Link>

        </>
    )
} 