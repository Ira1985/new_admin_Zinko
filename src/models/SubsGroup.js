import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";

export default class SubsGroup extends BaseEntity {

    subs = [];

    build(item) {
        super.build(item);
        this.subs = (item.hasOwnProperty('subs')?item['subs']:this.subs);
        return this;
    }

    static buildFilters() {
        return BaseEntity.buildFilters();
    }

    static buildColumns() {
        return BaseEntity.buildColumns();
    }
}

export const SubsGroupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required')
});
