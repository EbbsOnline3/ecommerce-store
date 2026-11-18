// frontend/src/utils.js
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN ?? "http://localhost:5000";

export const resolveImageUrl = (path) => {
  if (!path) return "/placeholder.png";           // missing image
  if (/^https?:\/\//i.test(path)) return path;    // already absolute (CDN, Unsplash, etc.)
  return `${API_ORIGIN}${path}`;                  // relative → prefix
};