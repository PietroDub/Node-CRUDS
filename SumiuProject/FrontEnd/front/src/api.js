import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


// User Routes
export const createUser = (userData) => api.post("/users", userData);
export const loginUser = (userData) => api.post("/users/login", userData);
export const logoutUser = () => api.post("/users/logout");
export const updateUser = (userId, userData) => api.put(`/users/${userId}`, userData);

// Requisition Routes
export const createRequisition = (requisitionData) => api.post("/requisitions", requisitionData);
export const getRequisition = (requisitionId) => api.get(`/requisitions/${requisitionId}`);
export const getAllRequisitions = () => api.get("/requisitions");
export const updateRequisition = (requisitionId, requisitionData) => api.put(`/requisitions/${requisitionId}`, requisitionData);
export const deleteRequisition = (requisitionId) => api.delete(`/requisitions/${requisitionId}`);

export default api;