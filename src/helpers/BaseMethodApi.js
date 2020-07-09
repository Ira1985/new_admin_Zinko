import {API} from "../../helpers/configAxios";
import {objectToFormData} from "../../helpers/configAxios";
import Sorter from "../../models/base/Sorter";
import Paging from "../../models/base/Paging";
import {toast} from "react-toastify";
import {toastConfig} from "../../helpers/toastConfig";
import i18n from "../../i18n";

export const baseService = {
    getList,
    update,
    remove,
    getItem,
    removeByList,
    //removeByFilter,
    create,
    saveItem,
    getCombo,
    //upload,
    //unload
};


const constsRu = ['объект', 'объекта', 'объектов', 'объекты'];

//const constsEn = ['object', 'object', 'objects', 'objects'];

function getList(url, filters, sorter, paging, constRu = constsRu, constEn = constsEn) {

    console.log(i18n.t('baseEntity.id'));

    let sorterNew = sorter?sorter: new Sorter().build('name', 'asc');
    let pagingNew = paging?paging: new Paging().buildWithLimit(100);
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
        if(res && res.status === 200 && res.data && res.data.success) {
            return res.data;
        } else {
            console.log('Error getting list '+constEn[2]+':', res.data?res.data.error:res.status);
            toast.error('Ошибка получения списка '+constRu[2], toastConfig);
            return res.data;
        }
    }).catch(error => {
        console.log('Error getting list '+constEn[2]+':', error);
        toast.error('Ошибка получения списка '+constRu[2], toastConfig);
        return null;
    });
}

function getItem(url, id, constRu = constsRu, constEn = constsEn) {
    return API.get(url + id)
        .then(res => {
            if(res && res.status === 200 && res.data && res.data.success) {
                return res.data;
            } else {
                console.log('Error getting '+ constEn[1] +' with id:' + id, res.data?res.data.error:res.status);
                toast.error('Ошибка получения '+constRu[1]+' с ид: ' + id, toastConfig);
                //baseExceptionHandler(res.data, constRu, "emptyLink", context);
                return res.data;
            }
        })
        .catch(error => {
            console.log('Error getting '+constEn[1]+': ' + id, error);
            toast.error('Ошибка получения '+constRu[1]+' с id: '+ id, toastConfig);
            return null;
        });
}

function remove(url, id, constRu = constsRu, constEn = constsEn) {
    return API.delete(url + id)
        .then(res => {
            if(res && res.status === 200 && res.data && res.data.success) {
                toast.success(+constRu[0]+' с ИД: ' + id + ' удален', toastConfig);
            }else {
                console.log('Error delete '+constEn[1]+' with id:'+id, res.data?res.data.error:res.status);
                toast.error('Ошибка удаления '+constRu[1]+' с ид: ' + id, toastConfig);
            }
            return res.data;
        })
        .catch(error => {
            console.log('Error delete '+constEn[1]+': '+ id, error);
            toast.error('Ошибка удаления '+constRu[1]+' с id: '+ id, toastConfig);
            return null;
        });
}

function removeByList(url, ids, constRu = constsRu, constEn = constsEn) {
    return API.delete(url, {params:{ids:ids}})
        .then(res => {
            if(res && res.status === 200 && res.data && res.data.success) {
                if(ids && ids.split(',').length > 1)
                    toast.success('Выбранные '+constRu[3]+' удалены', toastConfig);
                else
                    toast.success('Выбранный '+constRu[0]+' удален', toastConfig);
            } else {
                console.log('Error delete list '+constEn[2]+':', ids, res.data?res.data.error:res.status);
                if(ids && ids.split(',').length > 1)
                    toast.error('Ошибка удаления списка '+constRu[2], toastConfig);
                else
                    toast.error('Ошибка удаления '+constRu[0], toastConfig);
            }
            return res.data;
        })
        .catch(error => {
            console.log('Error delete '+constEn[2]+':', ids, error);
            if(ids && ids.split(',').length > 1)
                toast.error('Ошибка удаления списка '+constRu[2], toastConfig);
            else
                toast.error('Ошибка удаления '+constRu[0], toastConfig);
            return null;
        });
}

function saveItem(url, item, constRu = constsRu, constEn = constsEn) {
    if(item.id)
        return this.update(url, item, constRu, constEn);
    else
        return this.create(url, item, constRu, constEn);
}

function update(url, item, constRu = constsRu, constEn = constsEn, saveAsForm) {

    console.log('start update');

    let result = null;
    if(saveAsForm)
        return API.post(url, objectToFormData(item,'', ['updatedAt','createdAt']), { headers: {'Content-Type': 'multipart/form-data' }})
            .then(res => {return updateHelper(res, constRu, constEn)})
            .catch(error => {
                console.log('Error update '+constEn[1], error);
                toast.error('Ошибка при сохранение '+constRu[1], toastConfig);
                return null;
            });
    else
        return API.post(url, JSON.stringify(item), { headers: {'Content-Type': 'application/json'} }).then(res => {return updateHelper(res, constRu, constEn)})
            .catch(error => {
                console.log('Error update '+constEn[1], error);
                toast.error('Ошибка при сохранение '+constRu[1], toastConfig);
                return null;
            });
}

function updateHelper(res, constsRu, constsEn) {
    if(res && res.status === 200 && res.data && res.data.success) {
        toast.success('Изминение сохранены', toastConfig);
    } else {
        console.log('Error update '+constsEn[1], res.data?res.data.error:res.status);
        toast.error('Ошибка при сохранение '+constsRu[1], toastConfig);
    }
    return res.data;
}


function create(url, item, constRu = constsRu, constEn = constsEn, saveAsForm) {
    let result = null;

    console.log('start create');

    if(saveAsForm)
        return API.put(url, objectToFormData(item,'', ['updatedAt','createdAt']), { headers: {'Content-Type': 'multipart/form-data' }})
            .then(res => {return updateHelper(res, constRu, constEn)})
            .catch(error => {
                console.log('Error create '+constEn[1], error);
                toast.error('Ошибка при сохранение '+constRu[1], toastConfig);
                return null;
            });
    else
        return  API.put(url, JSON.stringify(item), { headers: {'Content-Type': 'application/json'} })
            .then(res => {return updateHelper(res, constRu, constEn)})
            .catch(error => {
                console.log('Error create '+constEn[1], error);
                toast.error('Ошибка при сохранение '+constRu[1], toastConfig);
                return null;
            });
}

function getCombo(url, name, limit, constRu = constsRu, constEn = constsEn, ...other) {
    let params = {
        name:name,
        limit:limit
    };
    if(other && other.length > 0) {
        other.map(item => {
            params = Object.assign({}, params, item);
        });
    }
    return API.get(url+"combo",{
        params: params
    }).then(res => {
        if(res && res.status === 200 && res.data && res.data.success) {
            return res.data;
        } else {
            console.log('Error getting combo '+constEn[2], res.data?res.data.error:res.status);
            toast.error('Ошибка при получения списка '+constRu[2], toastConfig);
            return res.data;
        }
    }).catch(error => {
        console.log('Error getting combo '+constEn[2], error);
        toast.error('Ошибка при получения списка '+constRu[2], toastConfig);
        return null;
    });
}

function dump(url, filters, constRu = constsRu, constEn = constsEn) {
    const params = {...filters};

    for (const key in params) {
        if (!params.hasOwnProperty(key)) continue;
        if ('' === params[key]) params[key] = null;
    }
    return API.post(url + 'dump', params).then(res => {
        if (res && 200 === res.status && res.data && res.data.success) {
            toast.success('Запрос на выгрузку принят', toastConfig);
        } else {
            console.log('Error dump list '+constEn[2], res.data?res.data.error:res.status);
            toast.error('Ошибка выгрузки списка '+constRu[2], toastConfig);
        }
        return res.data;
    }).catch(error => {
        return error;
    });
}
