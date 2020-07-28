import * as axios from "axios";
import {history} from "../App";
import {toast} from "react-toastify";
import i18n from "../i18n";

export const API = axios.create({
      baseURL: 'http://localhost:8083/content',
      //baseURL: 'http://185.95.22.17:8083/content',
     //baseURL: 'http://192.168.1.103:8080/content',
     //baseURL: 'http://212.24.48.52:8080/content',
    timeout: 1000000
});

// Alter defaults after instance has been created
//instance.defaults.headers.common['Authorization'] = 'JWT_TOKEN_HERE';
API.defaults.headers.post['Content-Type'] = 'application/json';
API.defaults.headers.post['Accept-Language'] = 'ru-RU';
API.defaults.timeout = 1000000;
API.interceptors.request.use(
    config => {
        if (!config.headers.Authorization) {
            //localStorage.setItem('cs_user', JSON.stringify(user))
            let user = JSON.parse(localStorage.getItem("cs2_user"));
            if(user && user.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
                //config.headers.Authorization = `Bearer ${'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjMsImNyZWF0ZWQiOjE1OTQ1OTQ4NjgwMDAsImlzcyI6InJ1c2NsaW1hdF9jcyIsImV4cCI6MTU5NTE5OTY2OCwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSJ9.Hm9zJ4_R00uhWHRuH_QOJ4YIeZme8f_egkwIC3O1YuxtMJoEj1GPCxjzvPgOj_MqpxtWJAMywAlrADBSpp_Q0g'}`;
            }
        }
        return config;
    },
    error => Promise.reject(error)
);

// Add a response interceptor
API.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    if(error && error.response){
        switch(error.response.status) {
            case 401:{
                history.push('/login');
            break;}
            case 500:{
                console.log(i18n.t('services.base.errors.server'), error);
                toast.error(i18n.t('services.base.errors.server'), {onClose:()=>{toast.dismiss()}});
                return Promise.reject(error);
                break;}
            case 404:{
                console.log(i18n.t('services.base.errors.pathNotFound'), error);
                toast.error(i18n.t('services.base.errors.pathNotFound'), {onClose:()=>{toast.dismiss()}});
                return Promise.reject(error);
                break;}
            default:{
                console.log(i18n.t('services.base.errors.network'), error);
                toast.error(i18n.t('services.base.errors.network'), {onClose:()=>{toast.dismiss()}});
                return Promise.reject(error);
            }
        }
    } else {
        console.log(i18n.t('services.base.errors.network'), error);
        toast.error(i18n.t('services.base.errors.network'), {onClose:()=>{toast.dismiss()}});
        return Promise.reject(error);
    }
    //return Promise.reject(error);
});


export function objectToFormData(obj, rootName, ignoreList) {
    var formData = new FormData();

    function appendFormData(data, root) {
        if (!ignore(root)) {
            root = root || '';
            if (data instanceof File) {
                formData.append(root, data);
            } else if (Array.isArray(data)) {
                for (var i = 0; i < data.length; i++) {
                    appendFormData(data[i], root + '[' + i + ']');
                }
            } else if (typeof data === 'object' && data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (root === '') {
                            appendFormData(data[key], key);
                        } else {
                            appendFormData(data[key], root + '.' + key);
                        }
                    }
                }
            } else {
                if (data !== null && typeof data !== 'undefined') {
                    formData.append(root, data);
                }
            }
        }
    }

    function ignore(root){
        return Array.isArray(ignoreList)
            && ignoreList.some(function(x) { return x === root; });
    }

    appendFormData(obj, rootName);

    return formData;
}
