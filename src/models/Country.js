import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";

export default class Country extends BaseEntity {

    build(item) {
        return super.build(item);
    }

    static buildFilters() {
        return BaseEntity.buildFilters();
    }

    static buildColumns() {
        return BaseEntity.buildColumns();
    }
}

export const CountrySchema = Yup.object().shape({
    name: Yup.string()
        .min(2,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required')
});
