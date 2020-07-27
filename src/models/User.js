import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";

export default class User extends BaseEntity {

    lastName = '';
    firstName = '';
    middleName = '';
    phone = '';
    email = '';
    lastLogin = null;
    department = null;
    roles = [];
    allowedGroups = [];
    extraPermissions = [];
    subscriptions=[];
    avatar='';
    avatarFile = null;
    changedAvatar = false;
    fullName = '';


    build(item){
        this.id = item['id'];
        this.name = (item['name']?item['name']:'');
        this.comment = (item['comment']?item['comment']:'');
        this.userName = (item['userName']?item['userName']:'');
        this.code = (item['code']?item['code']:'');
        this.enabled = (item['enabled']?item['enabled']:true);
        this.lastName = (item['lastName']?item['lastName']:'');
        this.firstName = (item['firstName']?item['firstName']:'');
        this.middleName = (item['middleName']?item['middleName']:'');
        this.phone = (item['phone']?item['phone']:'');
        this.email = (item['email']?item['email']:'');
        this.department = ((item['department'] && item['department'].id)?item['department']:null);
        this.avatar = (item['avatar']?item['avatar']:'');
        this.admin = (item['admin']?item['admin']:false);
        this.fullName = (item['fullName']?item['fullName']:'');
        this.groups = (item['groups'])?item['groups']:[];
        this.allowedGroups = item.allowedGroups || [];
        this.extraPermissions = item.extraPermissions || [];
        this.subscriptions = (item['subscriptions'])?item['subscriptions']:[];
        return this;
    }

    buildFilters(){
        return {
                'name':'',
                'comment':'',
                'code':'',
                'userName':'',
                'enabled':null
        };
    }
}

export const UserSchema = Yup.object().shape({
    userName: Yup.string()
        .min(2,'Минимальная длинна 2 символа')
        .trim()
        .required('Обязательное поле!'),
    firstName: Yup.string()
        .min(2,'Минимальная длинна 2 символа')
        .trim()
        .required('Обязательное поле!'),
    lastName: Yup.string()
        .min(2,'Минимальная длинна 2 символа')
        .trim()
        .required('Обязательное поле!'),
    department: Yup.object().shape({
        id:Yup.number().required('Обязательное поле!'),
        name:Yup.string().required()
    }).nullable().required('Обязательное поле!')
});
