import axios from 'axios';

export const fetchDrivers = async () => {
    try {
        const response = await axios.get('http://localhost:8080/drivers');
        return response.data;
    } catch (error) {
        console.error('Error while retrieving drivers API:', error);
    }
};

export const fetchDriverDetails = async (driverId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/drivers/${driverId}`);
        return response.data;
    } catch (error) {
        console.error(`Error while retrieving driver ${driverId} API:`, error);
    }
};

export const fetchConstructors = async () => {
    try {
        const response = await axios.get('http://localhost:8080/constructors');
        return response.data;
    } catch (error) {
        console.error('Error while retrieving constructors API:', error);
    }
};

export const fetchConstructorDetails = async (constructorId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/constructors/${constructorId}`);
        return response.data;
    } catch (error) {
        console.error('Error while retrieving constructors API:', error);
    }
};

export const fetchCircuits = async () => {
    try {
        const response = await axios.get('http://localhost:8080/circuits');
        return response.data;
    } catch (error) {
        console.error('Error while retrieving circuits API:', error);
    }
};

export const fetchSeasonDetails = async (year: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/seasons/${year}`);
        return response.data;
    } catch (error) {
        console.error(`Error while retrieving season details ${year} API:`, error);
    }
};

export const fetchRaces = async (year: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/seasons/${year}/races`);
        return response.data;
    } catch (error) {
        console.error(`Error while retrieving races ${year} API:`, error);
    }
};


export const fetchRaceDetails = async (raceId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/races/${raceId}`);
        return response.data;
    } catch (error) {
        console.error(`Error while retrieving race details ${raceId} API:`, error);
    }
};
