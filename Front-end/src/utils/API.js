import axios from 'axios';

//You can create an Axios instance with custom configurations:

const API = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Authorization': 'Bearer your_token',
    'Content-Type': 'application/json'
  }
});

/*Use the instance to make requests
API.get('/data')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));*/

 /* Handling Interceptors
Interceptors allow you to modify requests or responses globally, before the request is sent or after the response is received.
*/
// Request interceptor
 API.interceptors.request.use(
  (config) => {
    // You can modify the request here (e.g., add headers, log requests)
    const accessToken=localStorage.getItem("token")
    if(accessToken){

        config.headers.Authorization=`Bearer${accessToken}`
    }
    return config;
  },
  (error) => {
    // Handle errors before the request is sent
    return Promise.reject(error);
  }
);

// Response interceptor
/*axios.interceptors.response.use(
  response => {
    // Modify response data if needed
    console.log('Response:', response);
    return response;
  },
  error => {
    // Handle errors in response
    return Promise.reject(error);
  }
);*/
export default API;