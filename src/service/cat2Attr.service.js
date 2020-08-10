import {baseService} from "./base/BaseMethodApi";
import i18n from "../i18n";
import {API} from "../helpers/configAxios";

export const cat2AttrsService = {
    getList,
    update,
    remove,
    getItem,
    getCombo,
    getDescList,
    saveItem
};

const BASE_API_URL = '/cat2Attrs/';
const consts = [i18n.t('services.cat2Attrs.obj'), i18n.t('services.cat2Attrs.objecta'),
    i18n.t('services.cat2Attrs.objectov'), i18n.t('services.cat2Attrs.objects')];

function getDescList(catId){
    let params = {
        limit: 200,
        catId: catId
    };
    return API.get(BASE_API_URL + 'desc',{
        params: params
    })
        .then(res => {
            if(res && res.status === 200){
                console.log(res.data);
                if(res.data){
                    return res.data;
                }else
                    return null;
            }
            return null;
        })
        .catch(error => {
            console.log(error);
            return error;
        });
}

function baseResponse(res) {
    if(res && res.success)
        return res;
    else
        return null;
}

function saveItem(item) {
    return baseService.saveItem(BASE_API_URL, item, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in brand service saveItem', error);
            return null;
        });
}

function getList(filters, sorter, paging) {
    return baseService.getList(BASE_API_URL, filters, sorter, paging, consts)
        .then(res => {
            return baseResponse(res);
        }).catch(error => {
            console.log('Something wrong in customerModel service getList', error);
            return null;
        });
}

function getItem(id) {
    return baseService.getItem(BASE_API_URL, id, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in customerModel service getItem', error);
            return null;
        });
}

function remove(id) {
    return baseService.remove(BASE_API_URL, id, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in customerModel service remove', error);
            return null;
        });
}


function update(item) {
    return baseService.update(BASE_API_URL, item, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in customerModel service update', error);
            return null;
        });
}

function getCombo(name, limit) {
    return baseService.getCombo(BASE_API_URL, name, limit, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in customerModel service getCombo', error);
            return null;
        });
}