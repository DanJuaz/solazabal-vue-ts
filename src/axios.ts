import axios from 'axios';

axios.defaults.baseURL = 'https://solazabal-django.onrender.com/'
// axios.defaults.baseURL = 'http://192.168.1.75/'

axios.defaults.headers.common['x-api-key'] = 'julio';
axios.defaults.headers.common['Content-Type'] = 'application/json';
export default axios;