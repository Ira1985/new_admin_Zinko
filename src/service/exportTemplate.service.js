import {toast} from "react-toastify";
import {toastConfig} from "../helpers/toastConfig";
import {baseService} from "./base/BaseMethodApi";
import i18n from "../i18n";

export const exportTemplateService = {
    getList,
    update,
    remove,
    getItem,
    removeByList,
    removeByFilter,
    create,
    saveItem,
    getCombo,
    dump
};

const BASE_API_URL = '/export_templates/';
const consts = [i18n.t('services.exportTemplates.obj'), i18n.t('services.exportTemplates.objecta'),
    i18n.t('services.exportTemplates.objectov'), i18n.t('services.exportTemplates.objects')];

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
            console.log('Something wrong in exportTemplate service getList', error);
            return null;
        });
}

function getItem(id) {
    return baseService.getItem(BASE_API_URL, id, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in exportTemplate service getItem', error);
            return null;
        });
}

function remove(id) {
    return baseService.remove(BASE_API_URL, id, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in exportTemplate service remove', error);
            return null;
        });
}

function removeByList(ids) {
    return baseService.removeByList(BASE_API_URL, ids, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in exportTemplate service removeByList', error);
            return null;
        });
}

function removeByFilter(filters) {
    return baseService.removeByList(BASE_API_URL, filters, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in exportTemplate service removeByFilter', error);
            return null;
        });
}

function saveItem(item) {
    return baseService.saveItem(BASE_API_URL, item, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in exportTemplate service saveItem', error);
            return null;
        });
}

function update(item) {
    return baseService.update(BASE_API_URL, item, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in exportTemplate service update', error);
            return null;
        });
}

function create(item) {
    return baseService.create(BASE_API_URL, item, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in exportTemplate service create', error);
            return null;
        });
}

function getCombo(name, limit) {
    return baseService.getCombo(BASE_API_URL, name, limit, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in exportTemplate service getCombo', error);
            return null;
        });
}

function dump(filters) {
    return baseService.dump(BASE_API_URL, filters, consts)
        .then(res => {
            return baseResponse(res);
        }).catch(error => {
            console.log('Something wrong in exportTemplate service dump', error);
            return null;
        });
}