import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";

export default class Brand extends BaseEntity {

    build(item) {
        return super.build(item);
    }

  static buildFilters() {
       return BaseEntity.buildFilters();
  };
}

export const BrandSchema = Yup.object().shape({
    name: Yup.string()
        .min(2,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required')
});
