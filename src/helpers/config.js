import * as axios from "axios";
import {history} from "../App";

export const API = axios.create({
    //baseURL: 'http://localhost:8080/content',
    baseURL: 'http://212.24.48.52:8080/content',
    timeout: 1000000
});

// Alter defaults after instance has been created
//instance.defaults.headers.common['Authorization'] = 'JWT_TOKEN_HERE';
API.defaults.headers.post['Content-Type'] = 'application/json';
API.defaults.timeout = 1000000;
API.interceptors.request.use(
    config => {
        if (!config.headers.Authorization) {

            //localStorage.setItem('cs_user', JSON.stringify(user))
            //config.headers.Authorization = `Bearer fake-jwt-token`;
            let user = JSON.parse(localStorage.getItem("cs_user"));
            if(user && user.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        }
        return config;
    },
    error => Promise.reject(error)
);

// Add a response interceptor
API.interceptors.response.use(function (response) {
    console.log(' SDGSDGSDGDS GDSGSG SDGSDSD GSGSD SDGSDGSGS GS GDS GSDGDS GDSG DSG 1');
    //console.log(response);

    // Do something with response data
    return response;
}, function (error) {
    console.log(' SDGSDGSDGDS GDSGSG SDGSDSD GSGSD SDGSDGSGS GS GDS GSDGDS GDSG DSG 2');

    if(error && error.response){
        switch(error.response.status){
            case 401:{
                console.log('aaaaaaaa')
                break;}
            case 500:{
                //toast.info('Ошибка сервера, обратитесь к администратору', {onClose:()=>{toast.dismiss()}});
                return Promise.reject(error);
                break;}
            case 404:{
                //toast.info('Ошибка сервера, не найден такой путь', {onClose:()=>{toast.dismiss()}});
                return Promise.reject(error);
                break;}
            default:{
                //toast.info('Ошибка запроса', {onClose:()=>{toast.dismiss()}});
                return Promise.reject(error);
            }
        }
    } else {
        console.log('Данный путь не найден у Вас скорее всего 404');
        return Promise.reject(error);
    }
    //toast.info('Сервер временно не доступен', {onClose:()=>{toast.dismiss()}});

    //return Promise.reject(error);
});

export function appendFormdata(FormData, data, name){
    name = name || '';
    if (typeof data === 'object'){

        /* $.each(data, function(index, value){
             if (name == ''){
                 appendFormdata(FormData, value, index);
             } else {
                 appendFormdata(FormData, value, name + '['+index+']');
             }
         })*/
    } else {
        FormData.append(name, data);
    }
}


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