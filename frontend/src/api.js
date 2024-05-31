import axios from 'axios';

export const fetchCircuits = async () => {
    try {
        const response = await axios.get('http://localhost:8080/circuits');
        return response.data;
    } catch (error) {
        console.error('Erreur while retrieving circuits API:', error);
        throw error;
    }
};

export const fetchConstructors = async () => {
    try {
        const response = await axios.get('http://localhost:8080/constructors');
        return response.data;
    } catch (error) {
        console.error('Erreur while retrieving constructors API:', error);
        throw error;
    }
};