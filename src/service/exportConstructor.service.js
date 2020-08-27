import {toast} from "react-toastify";
import {toastConfig} from "../helpers/toastConfig";
import {baseService} from "./base/BaseMethodApi";
import i18n from "../i18n";
import {API} from "../helpers/configAxios";

export const exportConstructorService = {
    getList,
    update,
    remove,
    getItem,
    removeByList,
    removeByFilter,
    create,
    saveItem,
    getCombo,
    dump,
    getAutoCorrects,
    updateAutoCorrects4Et,
    previewResultConstructor,
    createConstructorByEt
};

const BASE_API_URL = '/etconstructor/';
const consts = [i18n.t('services.exportConstructors.obj'), i18n.t('services.exportConstructors.objecta'),
    i18n.t('services.exportConstructors.objectov'), i18n.t('services.exportConstructors.objects')];

function baseResponse(res) {
    if(res && res.success)
        return res;
    else
        return null;
}

function getList(etId) {
    let params = {
        exportTemplateId: etId
    };
    /*for (let key in filters) {
        if (filters.hasOwnProperty(key) && filters[key]) {
            params[key] =  filters[key];
        }
    }*/

    return API.get(BASE_API_URL,{
        params: params
    })
        .then(res => {
            if(res && res.status === 200){
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

function getItem(id) {
    return baseService.getItem(BASE_API_URL, id, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in exportConstructor service getItem', error);
            return null;
        });
}

function remove(id) {
    return baseService.remove(BASE_API_URL, id, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in exportConstructor service remove', error);
            return null;
        });
}

function removeByList(ids) {
    return baseService.removeByList(BASE_API_URL, ids, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in exportConstructor service removeByList', error);
            return null;
        });
}

function removeByFilter(filters) {
    return baseService.removeByList(BASE_API_URL, filters, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in exportConstructor service removeByFilter', error);
            return null;
        });
}

function saveItem(item) {
    return baseService.saveItem(BASE_API_URL, item, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in exportConstructor service saveItem', error);
            return null;
        });
}

function update(item) {
    return baseService.update(BASE_API_URL, item, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in exportConstructor service update', error);
            return null;
        });
}

function create(item) {
    return baseService.create(BASE_API_URL, item, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in exportConstructor service create', error);
            return null;
        });
}

function getCombo(name, limit) {
    return baseService.getCombo(BASE_API_URL, name, limit, consts)
        .then(res => {
            return baseResponse(res);
        })
        .catch(error => {
            console.log('Something wrong in exportConstructor service getCombo', error);
            return null;
        });
}

function dump(filters) {
    return baseService.dump(BASE_API_URL, filters, consts)
        .then(res => {
            return baseResponse(res);
        }).catch(error => {
            console.log('Something wrong in exportConstructor service dump', error);
            return null;
        });
}

function getAutoCorrects(etId) {
    return API.get(BASE_API_URL + etId + '/autocorrect')
        .then(res => {
            if(res && res.status === 200){
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

function updateAutoCorrects4Et(etId, autoCorrects) {
    return API.post(BASE_API_URL + etId + '/autocorrect', JSON.stringify(autoCorrects))
        .then(res => {
            if(res && res.status === 200){
                return res.data;
            } else {
                return "Ошибка обновления элемента";
            }
        })
        .catch(error => {
            console.log(error);
            return error;
        });
}

function previewResultConstructor(etId, productId) {
    return API.get(BASE_API_URL + productId + '/preview',
        {
            params:{etId: etId}
        })
        .then(res => {
            if(res && res.status === 200){
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

function createConstructorByEt(etId) {
    return API.get(BASE_API_URL + etId + '/templateByCat')
        .then(res => {
            if(res && res.status === 200){
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