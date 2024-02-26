import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/'
// axios.defaults.baseURL = 'http://192.168.1.75/'

axios.defaults.headers.common['x-api-key'] = 'julio';
export default axios;