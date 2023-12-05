import axios from 'axios';
import store from './store';
import * as actions from './store/actions';

const access_token = localStorage.getItem('access_token');
// axios.defaults.baseURL = `http://localhost:7658/`;
axios.defaults.baseURL = `http://192.168.1.142:7658/`;
axios.defaults.headers.common.secret_key = 'U2FsdGVkX1/RJbPyYVG6OMCBGjA6IPdWJYYlHNS7ido4t8fWoLkw1qNEuAfd2AaY';
axios.defaults.headers.common.publish_key = 'U2FsdGVkX1+aakRuXf1/qelNETehvEIooh61AYeIhqKnPx+XG5YuQqS7iTtCUXMZ';
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
