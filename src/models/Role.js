import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";
import FilterItem from "./base/FilterItem";
import GridColumn from "./base/GridColumn";

export default class Role extends BaseEntity {

    permissions = [];

    build(item) {
        super.build(item);
        this.permissions = (item['permissions']?item['permissions']:this.permissions);
        return this;
    }

    static buildFilters() {
        return  BaseEntity.buildFilters();
    }

    static buildColumns() {
        return  BaseEntity.buildColumns();
    }
}

export const RoleSchema = Yup.object().shape({
    name: Yup.string()
        .min(4,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required')
});
