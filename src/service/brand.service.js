import {toast} from "react-toastify";
import {toastConfig} from "../helpers/toastConfig";
import {baseService} from "../helpers/BaseMethodApi";

export const brandService = {
    getList,
    update,
    remove,
    getItem,
    removeByList,
    create,
    saveItem,
    getCombo,
    dump
};

const BASE_API_URL = '/brands/';
const constsRu = [ 'бренд', 'бренда', 'брендов','бренды'];
const constsEn = [ 'brand', 'brand', 'brands','brands'];

function getList(filters, sorter, paging) {
    return baseService.getList(BASE_API_URL, filters, sorter, paging)
        .then(res => {
            console.log(res);
            if(res && res.success) {
                return res;
            } else {
                //console.log('(then) Error getting list brand service '+constsEn[2]+':', res? res.error:res.status);

                console.log('then Error');
                //toast.error('Ошибка получения списка '+constsRu[2], toastConfig);
            }
            return null;
        }).catch(error => {
            console.log('(catch) Error getting list brand service '+constsEn[2]+':', error);
            //toast.error('Ошибка получения списка '+constsRu[2], toastConfig);
            return null;
        });
}

function getItem(id) {
    return baseService.getItem(BASE_API_URL, id)
        .then(res => {
            if(res && res.status === 200 && res.data && res.data.success){
                return res.data;
            } else {
                console.log('Error getting '+ constsEn[1] +' with id:' + id, res.data?res.data.error:res.status);
                //toast.error('Ошибка получения '+constsRu[1]+' с ид: ' + id, toastConfig);
            }
            return null;
        })
        .catch(error => {
            console.log('Error getting '+constsEn[1]+': ' + id, error);
            //toast.error('Ошибка получения '+constsRu[1]+' с id: '+ id, toastConfig);
            return error;
        });
}

function remove(id) {
    return baseService.remove(BASE_API_URL, id)
        .then(res => {
            if(res && res.status === 200 && res.data && res.data.success) {
                //toast.success(+constsRu[0]+' с ИД: ' + id + ' удален', toastConfig);
                return res.data;
            }else {
                console.log('Error delete '+constsEn[1]+' with id:'+id, res.data?res.data.error:res.status);
                //toast.error('Ошибка удаления '+constsRu[1]+' с ид: ' + id, toastConfig);
            }
            return null;
        })
        .catch(error => {
            console.log('Error delete '+constsEn[1]+': '+ id, error);
            //toast.error('Ошибка удаления '+constsRu[1]+' с id: '+ id, toastConfig);
            return null;
        });
}

function removeByList(ids) {
    return baseService.removeByList(BASE_API_URL, ids)
        .then(res => {
            if(res && res.status === 200 && res.data && res.data.success) {
                if(ids && ids.split(',').length > 1)
                    toast.success('Выбранные '+constsRu[3]+' удалены', toastConfig);
                else
                    toast.success('Выбранный '+constsRu[0]+' удален', toastConfig);
                return res.data;
            } else {
                console.log('Error delete list '+constsEn[2]+':', ids, res.data?res.data.error:res.status);
                if(ids && ids.split(',').length > 1)
                    toast.error('Ошибка удаления списка '+constsRu[2], toastConfig);
                else
                    toast.error('Ошибка удаления '+constsRu[0], toastConfig);
            }
            return null;
        })
        .catch(error => {
            console.log('Error delete '+constsEn[2]+':', ids, error);
            if(ids && ids.split(',').length > 1)
                toast.error('Ошибка удаления списка '+constsRu[2], toastConfig);
            else
                toast.error('Ошибка удаления '+constsRu[0], toastConfig);
            return null;
        });
}

function saveItem(item) {
    if(item.id)
        return this.update(item);
    else
        return this.create(item);
}

function update(item) {
    return baseService.update(BASE_API_URL, item)
        .then(res => {
            if(res && res.status === 200 && res.data && res.data.success) {
                toast.success('Изминение сохранены', toastConfig);
                return res.data;
            } else {
                console.log('Error update '+constsEn[1], res.data?res.data.error:res.status);
                toast.error('Ошибка при сохранение '+constsRu[1], toastConfig);
            }
        })
        .catch(error => {
            console.log('Error update '+constsEn[1], error);
            toast.error('Ошибка при сохранение '+constsRu[1], toastConfig);
            return null;
        });
}

function create(item) {
    return baseService.create(BASE_API_URL, item)
        .then(res => {
            if(res && res.status === 200 && res.data && res.data.success) {
                toast.success('Изминение сохранены', toastConfig);
                return res.data;
            } else {
                console.log('Error update '+constsEn[1], res.data?res.data.error:res.status);
                toast.error('Ошибка при сохранение '+constsRu[1], toastConfig);
            }
        })
        .catch(error => {
            console.log('Error create '+constsEn[1], error);
            toast.error('Ошибка при сохранение '+constsRu[1], toastConfig);
            return null;
        });
}

function getCombo(name, limit) {
    return baseService.getCombo(BASE_API_URL, name, limit)
        .then(res => {
            if(res && res.status === 200 && res.data && res.data.success) {
                return res.data;
            } else {
                console.log('Error getting combo '+constsEn[2], res.data?res.data.error:res.status);
                toast.error('Ошибка при получения списка '+constsRu[2], toastConfig);
            }
            return null;
        })
        .catch(error => {
            console.log('Error getting combo '+constsEn[2], error);
            toast.error('Ошибка при получения списка '+constsRu[2], toastConfig);
            return null;
        });
}

function dump(filters) {
    return baseService.dump(BASE_API_URL, filters)
        .then(res => {
            if (res && 200 === res.status && res.data && res.data.success) {
                toast.success('Запрос на выгрузку принят', toastConfig);
                return res.data;
            } else {
                console.log('Error dump list '+constsEn[2], res.data?res.data.error:res.status);
                toast.error('Ошибка выгрузки списка '+constsRu[2], toastConfig);
            }
            return null;
        }).catch(error => {
            return error;
        });
}