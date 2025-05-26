import conf from "../Config";
import axios from "axios";
import Cookie from "js-cookies";

class AuthService {
    constructor() {
        this.intialApi = axios.create({
            baseURL: `${conf.apiUrl}/auth`,
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

    async loginUser(email, password) {
        try {
            const response = await this.intialApi.post('/login', { email, password });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    };

    async getCurrentUser() {
        try {
            const user = Cookie.getItem('user') ? JSON.parse(Cookie.getItem('user')) : null;
            return user;
        } catch (error) {
            this.handleError(error);
        }
    }

    async updateUserPass(id, passObj) {
        try {
            const response = await this.intialApi.post(`/updatePass/${id}`, passObj);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    };

    async createUser(user) {
        try {
            const response = await this.intialApi.post('/signin', user);
            return response.data;
        } catch (error) {
            this.handleError(error)
        }
    };

    async deleteUserById(id) {
        try {
            const response = await this.intialApi.delete(`/delete/${id}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    };

    async updateUser(id, user) {
        try {
            const response = await this.intialApi.post(`/update/${id}`, user);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    };

    async getAllUser(page, size) {
        try {
            const response = await this.intialApi.get(`/all/${page}/${size}`);
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
}

const authService = new AuthService();

export default authService;