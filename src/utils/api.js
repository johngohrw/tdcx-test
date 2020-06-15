import axios from 'axios';

export const axiosBaseConfig = {
    baseURL: process.env.REACT_APP_BASE_API,
    headers: {
        Accept: 'application/json',
    }
};

export const apiRequest = axios.create(axiosBaseConfig);
