import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const studentAPI = {
  getAll: (params = {}) => api.get('/students/', { params }),
  getById: (id) => api.get(`/students/${id}/`),
  create: (data) => api.post('/students/', data),
  update: (id, data) => api.put(`/students/${id}/`, data),
  delete: (id) => api.delete(`/students/${id}/`),
  exportExcel: (params = {}) => api.get('/students/export-excel/', { params, responseType: 'blob' }),
  getStats: () => api.get('/students/stats/'),
}

export const villageAPI = {
  getAll: () => api.get('/villages/'),
  create: (data) => api.post('/villages/', data),
  update: (id, data) => api.put(`/villages/${id}/`, data),
  delete: (id) => api.delete(`/villages/${id}/`),
}

export default api
