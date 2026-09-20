/** Backend API base. Empty string uses Vite dev proxy (/api → localhost:5001). */
export const API_BASE = import.meta.env.VITE_API_BASE_URL || ''
