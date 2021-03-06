/*eslint-disable*/


import axios, { AxiosRequestConfig } from 'axios';
import * as qs from 'qs';
import { message } from 'antd';


export interface HttpResquest {
  get?(url, data, baseUrl?): Promise<any>;
  post?(url, data, baseUrl?): Promise<any>;
  patch?(url, data, baseUrl?): Promise<any>;
  delete?(url, data, baseUrl?): Promise<any>;
  put?(url, data, baseUrl?): Promise<any>;
}

enum HTTPERROR {
  LOGICERROR,
  TIMEOUTERROR,
  NETWORKERROR,
}

// const TOKENERROR = [401, 402, 403];

const DEFAULTCONFIG = {
  baseURL: process.env.BASEURL,
  timeout: 5000,
};

const http: HttpResquest = {};
const methods = ['get', 'post', 'patch', 'put', 'delete'];

// let authTimer: number = null;

const isSuccess = res => res.code === 0;
const resFormat = res => res.response || res.data || {};

methods.forEach((v) => {
  http[v] = (url, data, baseUrl?) => {
    const axiosConfig: AxiosRequestConfig = {
      url,
      method: v,
      baseURL: baseUrl || DEFAULTCONFIG.baseURL,
      headers: { Authorization: 'Bearer ' },
    };
    const instance = axios.create(DEFAULTCONFIG);
    // Add a request interceptor
    instance.interceptors.request.use(
      (cfg) => {
        // 添加额外时间戳
        const ts = Date.now();
        const queryData = { ts };
        cfg.params = { ...cfg.params, ...queryData };
        return cfg;
      },
      error => Promise.reject(error),
    );
    // Add a response interceptor
    instance.interceptors.response.use(
      (response) => {
        let rdata = response.data;
        // console.log('response', response);
        if (typeof response.data === 'object' && !Number.isNaN(response.data.length)) {
          rdata = response.data[0];
        }
        if (!isSuccess(rdata)) {
          const err = {
            msg: rdata.msg,
            errCode: rdata.errCode,
            type: HTTPERROR[HTTPERROR.LOGICERROR],
            config: response.config,
          };
          return Promise.reject(err);
        }
        return resFormat(rdata);
      },
      (error) => {
        // if (TOKENERROR.includes(error.response.status)) {
        //   message.destroy();
        //   message.error('用户认证失败! 请登录重试...');
        //   window.clearTimeout(authTimer);
        //   authTimer = window.setTimeout(() => {
        //     location.replace('/#/login');
        //   },                            300);
        //   return;
        // }
        const err = {
          msg: error.response.statusText || error.message || '网络故障',
          type: /^timeout of/.test(error.message)
            ? HTTPERROR[HTTPERROR.TIMEOUTERROR]
            : HTTPERROR[HTTPERROR.NETWORKERROR],
          config: error.config,
        };
        return Promise.reject(err);
      },
    );
    if (v === 'get') {
      axiosConfig.params = data;
    } else if (data instanceof FormData) {
      axiosConfig.data = data;
    } else {
      axiosConfig.data = qs.stringify(data);
    }
    return instance
      .request(axiosConfig)
      .then(res => res)
      .catch((err) => {
        message.destroy();
        message.error(err.response || err.msg || err.stack || '未知错误');
        if (axiosConfig.url.includes('autoScript.set')) {
          return Promise.resolve({
            err,
          });
        }
        return Promise.reject({
          err,
          stack: err.msg || err.stack || '',
        });
      });
  };
});

export default http;
