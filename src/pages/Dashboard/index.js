import React, { useEffect, useState } from 'react';
import api from '../../services/api'


export default function Login() {
    const [spots, setSpots] = useState([]); //espera um array
        
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
            <ul className='spot-list'>
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header></header>
                        <strong>{spot.company}</strong>
                        <span>{spot.price}</span>
                    </li>
                ))}
            </ul>
        </>
    )
}