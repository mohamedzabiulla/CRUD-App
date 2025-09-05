import axios from 'axios';


export default axios.create({
  baseURL: 'http://localhost:5000/api/v1/users', // adjust this if your backend has a different route
  withCredentials: true, // if using cookies/sessions
});
