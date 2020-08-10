import {baseService} from "./base/BaseMethodApi";
import i18n from "../i18n";

export const customerModelService = {
    getList,
    update,
    remove,
    getItem,
    getCombo,
};

const BASE_API_URL = '/customerModels/';
const consts = [i18n.t('services.customerModels.obj'), i18n.t('services.customerModels.objecta'),
    i18n.t('services.customerModels.objectov'), i18n.t('services.customerModels.objects')];

function baseResponse(res) {
    if(res && res.success)
        return res;
    else
        return null;
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