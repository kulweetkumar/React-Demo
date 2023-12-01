import axios from 'axios';
import store from './store';
import * as actions from './store/actions';

const access_token = localStorage.getItem('access_token');
axios.defaults.baseURL = `https://app.spottedpr.com/`;
// axios.defaults.baseURL = `http://localhost:9000/`;
// axios.defaults.baseURL = `http://192.168.1.210:9000/`;
axios.defaults.headers.common.secret_key = 'sk_/kck7ha47GViGiig4PnNZOmWR2sFAacvrdUE/aeMNbV/U79AZMrNv8wDCl9EYl+vJQ==';
axios.defaults.headers.common.publish_key = 'pk_Uq/FGPETv6A4V4bnlCz/UEZjxXwhPTYZ2a0W7A70af2gDdQSZJOHk/ce+69OXfo91W0=';
axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = true;

// Create instance
const axiosInstance = axios.create();

// Axios wrapper to handle error
const axiosWrapper = apiCall => apiCall.then(res => res.data).catch(err => Promise.reject(err));

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
        store.dispatch(actions.authLogout());
    }
    return Promise.reject(error);
  },
);

export default axios;
