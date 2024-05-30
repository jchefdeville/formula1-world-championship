import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Circuits from './components/Circuits';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/circuits')
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(error => {
                console.error('Erreur while retrieving circuits API:', error);
            });
    }, []);

    return (
        <div>
            <h1>Circuits</h1>
            <Circuits data={data} />
        </div>
    );
}

export default App;