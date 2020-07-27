import {API} from "../../helpers/configAxios";
import {objectToFormData} from "../../helpers/configAxios";
import Sorter from "../../models/base/Sorter";
import Paging from "../../models/base/Paging";
import {toast} from "react-toastify";
import {toastConfig} from "../../helpers/toastConfig";
import i18n from "../../i18n";
import {capitalizeFirstLetter} from "../../helpers/utils";

export const baseService = {
    getList,
    update,
    remove,
    getItem,
    removeByList,
    removeByFilter,
    create,
    saveItem,
    getCombo,
    //upload,
    //dump
};

const consts = ['services.base.consts.obj', 'services.base.consts.objecta', 'services.base.consts.objectov', 'services.base.consts.objects'];

// showPageError - if needed show errors in win
function processResponse(res, showPageError, baseError, successMsg = null) {
    if(res && res.status === 200 && res.data) {
        if(!res.data.success && showPageError) {
            const error = res.data.errors[0].error,
                code = res.data.errors[0].code;
            console.log('Error server - ' + code + ' - ' + error, res);
            toast.error(error, toastConfig);
        } else if(successMsg)
            toast.success(successMsg, toastConfig);

        return res.data;
    } else {
        //const error = i18n.t('services.base.errors.network') + ((res && res.status)?' - ' + res.status:'');
        console.log(baseError + ' - ' + ((res && res.status)?' - ' + res.status:''), res);
        toast.error(baseError, toastConfig);
        return null;
    }
}

function processCatch(error) {
    const msg = i18n.t('services.base.errors.code');
    console.log(msg, error);
    toast.error(msg, toastConfig);
    return null;
}

function getList(url, filters, sorter, paging, consts = consts, showPageError = true) {

    let sorterNew = sorter?sorter: new Sorter().build('name', 'asc');
    let pagingNew = paging?paging: new Paging().buildWithLimit(20);
    const params = {
        sortName: sorterNew.name,
        sortDirect: sorterNew.directions,
        page: pagingNew.page,
        limit: pagingNew.limit
    };
    for (let key in filters) {
        if (filters.hasOwnProperty(key) && filters[key]) {
            params[key] = filters[key];
        }
    }

    return API.get(url, {
        params: params
    }).then(res => {
        return processResponse(res, showPageError, (i18n.t('services.base.errors.list') + ' ' + consts[2]));
    }).catch(error => {
        return processCatch(error);
    });
}

function getItem(url, id, consts = consts, showPageError = true) {
    return API.get(url + id)
        .then(res => {
            return processResponse(res, showPageError, (i18n.t('services.base.errors.item') + ' ' + consts[1]));
        })
        .catch(error => {
            return processCatch(error);
        });
}

function remove(url, id, consts = consts, showPageError = true) {
    return API.delete(url + id)
        .then(res => {
            //${constName} c ид: ${id} - удален
            const constName = capitalizeFirstLetter(consts[0]);
            let successMsgTpl = eval('`'+ i18n.t('services.base.successes.deleteItem') + '`');
            return processResponse(res, showPageError, (i18n.t('services.base.errors.deleteItem') + ' ' + consts[1]), (String.raw, successMsgTpl));
        })
        .catch(error => {
            return processCatch(error);
        });
}

function removeByList(url, ids, consts = consts, showPageError = true) {
    return API.delete(url, {params: {ids:ids.join(',')}})
        .then(res => {
            //if(ids && ids.split(',').length > 1) {
            //.join(",")
            if(ids && ids.length > 1) {
                const constName = capitalizeFirstLetter(consts[3]);
                let successMsgTpl = eval('`'+ i18n.t('services.base.successes.deleteList') + '`');
                return processResponse(res, showPageError, (i18n.t('services.base.errors.deleteList') + ' ' + consts[2]), (String.raw, successMsgTpl));
            } else {
                const id = ids[0];
                const constName = capitalizeFirstLetter(consts[0]);
                let successMsgTpl = eval('`'+ i18n.t('services.base.successes.deleteItem') + '`');
                return processResponse(res, showPageError, (i18n.t('services.base.errors.deleteItem') + ' ' + consts[1]), (String.raw, successMsgTpl));
            }
        })
        .catch(error => {
            return processCatch(error);
        });
}

function removeByFilter(url, filters, consts = consts, showPageError = true) {
    return API.delete(url, {params: {filters:filters}})
        .then(res => {
            const constName = capitalizeFirstLetter(consts[3]);
            let successMsgTpl = eval('`'+ i18n.t('services.base.successes.deleteFilter') + '`');
            return processResponse(res, showPageError, (i18n.t('services.base.errors.deleteFilter') + ' ' + consts[2]), (String.raw, successMsgTpl));
        })
        .catch(error => {
            return processCatch(error);
        });
}

function saveItem(url, item, consts = consts, saveAsForm = false, showPageError = true) {
    if(item.id)
        return this.update(url, item, consts = consts, saveAsForm, showPageError = true);
    else
        return this.create(url, item, consts = consts, saveAsForm, showPageError = true);
}

function update(url, item, consts = consts, saveAsForm = false, showPageError = true) {
    const errorMsg = i18n.t('services.base.errors.update') + ' ' + consts[1];
    const successMsg = capitalizeFirstLetter(consts[0]) + ' ' + i18n.t('services.base.successes.update');
    if(saveAsForm) {
        return API.post(url, objectToFormData(item, '', ['updatedAt', 'createdAt']), {headers: {'Content-Type': 'multipart/form-data'}})
            .then(res => {
                return processResponse(res, showPageError, errorMsg, successMsg);
            })
            .catch(error => {
                return processCatch(error);
            });
    }else {
        return API.post(url, JSON.stringify(item), {headers: {'Content-Type': 'application/json'}}).then(res => {
            return processResponse(res, showPageError, errorMsg, successMsg);
        })
            .catch(error => {
                return processCatch(error);
            });
    }
}

function create(url, item, consts = consts, saveAsForm = false, showPageError = true) {
    const errorMsg = i18n.t('services.base.errors.create') + ' ' + consts[1];
    const successMsg = capitalizeFirstLetter(consts[0]) + ' ' + i18n.t('services.base.successes.create');
    if(saveAsForm) {
        return API.put(url, objectToFormData(item, '', ['updatedAt', 'createdAt']), {headers: {'Content-Type': 'multipart/form-data'}})
            .then(res => {
                return processResponse(res, showPageError, errorMsg, successMsg);
            })
            .catch(error => {
                return processCatch(error);
            });
    } else {
        return API.put(url, JSON.stringify(item), {headers: {'Content-Type': 'application/json'}})
            .then(res => {
                return processResponse(res, showPageError, errorMsg, successMsg);
            })
            .catch(error => {
                return processCatch(error);
            });
    }
}

function getCombo(url, name, limit = 100, consts = consts, showPageError = true, ...other) {
    let params = {
        name:name,
        limit:limit
    };
    if(other && other.length > 0) {
        other.map(item => {
            params = Object.assign({}, params, item);
        });
    }
    return API.get(url+"combo", {
        params: params
    }).then(res => {
        return processResponse(res, showPageError, (i18n.t('services.base.errors.list') + ' ' + consts[2]));
    }).catch(error => {
        return processCatch(error);
    });
}

function dump(url, ids, filters, consts = consts, showPageError = true) {
    const params = {...filters};

    for (const key in params) {
        if (!params.hasOwnProperty(key)) continue;
        if ('' === params[key]) params[key] = null;
    }
    /*return API.post(url + 'dump', params).then(res => {
        if (res && 200 === res.status && res.data && res.data.success) {
            toast.success('Запрос на выгрузку принят', toastConfig);
        } else {
            console.log('Error dump list '+constEn[2], res.data?res.data.error:res.status);
            toast.error('Ошибка выгрузки списка '+constRu[2], toastConfig);
        }
        return res.data;
    }).catch(error => {
        return error;
    });*/
}
