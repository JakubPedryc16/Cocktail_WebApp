import axios from 'axios';

export const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Unauthorized!');
        return null;
    }
    return token;
};

export const fetchDataWithToken = async (url) => {
    try {
        const token = getToken();
        if (!token) {
            return null;
        }

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (e) {
        console.error('Error fetching data:', e);
        return null;
    }
};

export const deleteDataWithToken = async (url) => {
    try {
        const token = getToken();
        if (!token) {
            return null;
        }

        return await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (e) {
        console.error('Error deleting data:', e);
        return null;
    }
};

export const postDataWithToken = async (url, data, headers = {}) => {
    try {
        const token = getToken();
        if (!token) {
            return null;
        }

        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                ...headers
            }
        });

        return response.data;
    } catch (e) {
        console.error('Error posting data:', e);
        return null;
    }
};
