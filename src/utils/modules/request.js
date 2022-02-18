import axios from 'axios';
import Vue from 'vue';

const service = axios.create({
  timeout: 20000
});

service.interceptors.request.use(
  (config) => {
    config.data['location'] = window.location.href;
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code == 301) {
      window.location.href = res.url;
      return;
    }

    if (res.code !== 0) {
      Vue.prototype.$msg.error(res.msg || 'Error');
      return Promise.reject(new Error(res.msg || 'Error'));
    }
    return res;
  },
  (error) => {
    console.log('err' + error);
    Vue.prototype.$msg.error(error.message || 'Error');
    return Promise.reject(error);
  }
);

export default {
  request: service
};
