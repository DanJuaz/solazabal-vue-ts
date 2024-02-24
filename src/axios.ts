import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/'
// axios.defaults.baseURL = 'http://192.168.1.75/'

// Set the provided JWT token in the headers
//axios.defaults.headers['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4NTM0Njg2LCJpYXQiOjE3MDg1MzQzODYsImp0aSI6IjlhYzA0MzEzODcyZDRkNDhiMGI5MjQyYzVlNjNjMjJhIiwidXNlcl9pZCI6Mn0.hDziwMLYMEs_3nXW8JKFNS189LDCXCmQoaGWx9cO5-8';
//axios.defaults.headers['x-api-key'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4NTM0Njg2LCJpYXQiOjE3MDg1MzQzODYsImp0aSI6IjlhYzA0MzEzODcyZDRkNDhiMGI5MjQyYzVlNjNjMjJhIiwidXNlcl9pZCI6Mn0.hDziwMLYMEs_3nXW8JKFNS189LDCXCmQoaGWx9cO5-8';
export default axios;