import conf from "../Config";
import axios from "axios";
import Cookie from "js-cookies";

class PropertyService {
    constructor() {
        this.intialApi = axios.create({
            baseURL: `${conf.apiUrl}/property`,
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.intialApi.interceptors.request.use(
            (config) => {
                const token = Cookie.getItem("token") || "";
                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    async createProperty(property) {
        try {
            const response = await this.intialApi.post("/", property);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async uploadFiles(id, files) {
        try {
            const formData = new FormData();
            files.forEach((file) => formData.append("files", file));

            const token = Cookie.getItem("token") || "";
            const url = `${conf.apiUrl}/property/image/${id}`;

            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteFiles(id, encodedPublicId) {
        try {

            const token = Cookie.getItem("token") || "";
            const url = `${conf.apiUrl}/property/image/${id}/${encodedPublicId}`;

            const response = await axios.delete(url, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });

            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async updateProperty(id, property) {
        try {
            const response = await this.intialApi.post(`/edit/${id}`, property);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteProperty(id) {
        try {
            const response = await this.intialApi.delete(`/delete/${id}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getProperties(filters) {
        try {
            const response = await this.intialApi.post(`/all`, filters);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    };

    async getCityOrState(type, query = '') {
        try {
            const response = await this.intialApi.get(`/cityOrState`, {
                params: { type, q: query },
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    handleError(error) {
        if (error.response) {
            throw new Error(error.response.data.message || "Something went wrong");
        } else if (error.request) {
            throw new Error("No response received from the server");
        } else {
            throw new Error(error.message || "An error occurred");
        }
    }
}

const propertyService = new PropertyService();

export default propertyService;
