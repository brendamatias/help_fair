import axios from 'axios'

const api = axios.create({
  baseURL: 'https://help-fair-api.vercel.app',
})

api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('help_fair') ?? ''
  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
})

// // api.interceptors.response.use(
// //   (response: any) => response,
// //   (error) => {
// //     const statusCode = error?.response?.status;
// //     const currentPath = history.location.pathname;
// //     if (statusCode === 401 && currentPath !== "/") {
// //       return history.push("/logout");
// //     }

// //     return Promise.reject(error);
// //   }
// // );

export default api
