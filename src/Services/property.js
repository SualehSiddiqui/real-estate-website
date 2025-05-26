import conf from "../Config";
import axios from "axios";
import Cookie from "js-cookies";


class ItemService {
    constructor() {
        this.intialApi = axios.create({
            baseURL: `${conf.apiUrl}/item`,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        this.intialApi.interceptors.request.use(
            config => {
                const token = Cookie.getItem('token') || '';
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    };

    async createItem(item) {
        try {
            const response = await this.intialApi.post('/add', item);
            return response.data;
        } catch (error) {
            this.handleError(error)
        }
    };

    async deleteItemById(id) {
        try {
            const response = await this.intialApi.delete(`/delete/${id}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    };

    async updateItem(id, item) {
        try {
            const response = await this.intialApi.post(`/update/${id}`, item);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    };

    async getAllItem(page, size, status) {
        try {
            const response = await this.intialApi.get(`/all/${page}/${size}/${status}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    };

    async searchItem(searchObj) {
        try {
            const response = await this.intialApi.post(`/search`, searchObj);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    };

    handleError(error) {
        if (error.response) {
            console.error('API Error Response:', error.response.data);
            throw new Error(error.response.data.message || 'Something went wrong');
        } else if (error.request) {
            console.error('No Response:', error.request);
            throw new Error('No response received from the server');
        } else {
            console.error('Request Error:', error.message);
            throw new Error(error.message || 'An error occurred while making the request');
        }
    }
};

const itemService = new ItemService();

export default itemService;