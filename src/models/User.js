import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";
import FilterItem from "./base/FilterItem";
import GridColumn from "./base/GridColumn";

export default class User extends BaseEntity {

    lastName = '';
    firstName = '';
    middleName = '';
    phone = '';
    email = '';
    lastLogin = null;
    department = null;
    roles = [];
    allowedRoles = [];
    extraPermissions = [];
    subscriptions=[];
    avatar='';
    avatarFile = null;
    changedAvatar = false;
    fullName = '';


    build(item){
        super.build(item);
        this.userName = (item['userName']?item['userName']:'');
        this.lastName = (item['lastName']?item['lastName']:'');
        this.firstName = (item['firstName']?item['firstName']:'');
        this.middleName = (item['middleName']?item['middleName']:'');
        this.phone = (item['phone']?item['phone']:'');
        this.email = (item['email']?item['email']:'');
        this.department = ((item['department'] && item['department'].id)?item['department']:null);
        this.avatar = (item['avatar']?item['avatar']:'');
        this.fullName = (item['fullName']?item['fullName']:'');
        this.roles = (item['roles'])?item['roles']:[];
        this.allowedRoles = item.allowedRoles || [];
        this.extraPermissions = item.extraPermissions || [];
        this.subscriptions = (item['subscriptions'])?item['subscriptions']:[];
        return this;
    }

    static buildFilters() {
        let base = BaseEntity.buildFilters();
        base.push(FilterItem.buildText('users.fields.userName','userName', false));
        base.push(FilterItem.buildText('users.fields.lastName','lastName', false));
        base.push(FilterItem.buildText('users.fields.firstName','firstName', false));
        base.push(FilterItem.buildText('users.fields.middleName','middleName', false));
        base.push(FilterItem.buildText('users.fields.email','email', false));
        base.push(FilterItem.buildSelect('users.fields.department','department', false));
        return base;
    }

    static buildColumns() {
        let columns =  BaseEntity.buildColumns();
        columns.push(new GridColumn().build({field: 'userName', header: 'users.fields.userName', style:{}, sortable: false, order: 4, default: true, widthCoef:1.5}));
        columns.push(new GridColumn().build({field: 'lastName', header: 'users.fields.lastName', style:{}, sortable: false, order: 5, default: true, widthCoef:1.5}));
        columns.push(new GridColumn().build({field: 'firstName', header: 'users.fields.firstName', style:{}, sortable: false, order: 6, default: true, widthCoef:0.5}));
        columns.push(new GridColumn().build({field: 'middleName', header: 'users.fields.middleName', style:{}, sortable: false, order: 6, default: true, widthCoef:0.5}));
        columns.push(new GridColumn().build({field: 'department', header: 'users.fields.department', style:{}, sortable: false, order: 6, default: true, widthCoef:0.5}));
        return columns;
    }
}

export const UserSchema = Yup.object().shape({
    userName: Yup.string()
        .min(2,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required'),
    firstName: Yup.string()
        .min(2,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required'),
    lastName: Yup.string()
        .min(2,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required'),
    department: Yup.object().shape({
        id:Yup.number().required('baseEntity.errors.required'),
        name:Yup.string().required()
    }).nullable().required('baseEntity.errors.required')
});
