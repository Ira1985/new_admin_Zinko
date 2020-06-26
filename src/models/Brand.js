import * as Yup from "yup";

export default class Brand {
    id = null;
    name = '';
    comment = '';
    enabled = true;
    deleted = false;

    build(item) {
        this.id = item['id'];
        this.name = (item['name']?item['name']:this.name);
        this.comment = (item['comment']?item['comment']:this.comment);
        this.enabled = (item.hasOwnProperty('enabled')?item['enabled']:this.enabled);
        this.deleted = (item.hasOwnProperty('deleted')?item['deleted']:this.deleted);
        return this;
    }

  /*  static buildFilters() {
        return [
            {
                title: '',
                type: 'text|number|select|multiSelect|checkbox',
                filterField: '',
                defaultVal: '',
                required: '',
                operations: []
            }
        ];

        };*/
}

export const BrandSchema = Yup.object().shape({
    name: Yup.string()
        .min(2,'Минимальная длинна 2 символа')
        .trim()
        .required('Обязательное поле!')
});
