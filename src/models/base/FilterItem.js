export const FilterType = {
    NONE: 'NONE',
    IDS: 'IDS', // equals, in list, not_in
    TEXT: 'TEXT', // contains, start_with, end_with, is_empty, is_not_empty
    NUMBER: 'NUMBER', // equals, more_then, less_then, between, is_empty, is_not_empty
    LIST: 'LIST', // equals, in list, not_in, is_empty, is_not_empty //concat SELECT and MULTI (maybe not needed tow types)
    SELECT: 'SELECT', // equals, in list, not_in, is_empty, is_not_empty
    MULTI: 'MULTI', // equals, in list, not_in, is_empty, is_not_empty
    DATE: 'DATE' // more_then, less_then, between, is_empty, is_not_empty
};

export const FilterOperation = {
    EQUALS: 'EQUALS',
    CONTAINS: 'CONTAINS',
    IS_EMPTY: 'IS_EMPTY',
    IS_NOT_EMPTY:'IS_NOT_EMPTY',
    START_WITH: 'START_WITH',
    END_WITH: 'END_WITH',
    MORE_THEN: 'MORE_THEN',
    LESS_THEN: 'LESS_THEN',
    BETWEEN: 'BETWEEN',
    IN_LIST: 'IN_LIST',
    NOT_IN_LIST: 'NOT_IN_LIST'
};

export function getAFilterOperation(type){
    switch (type) {
        case FilterOperation.NONE: return '';
        case FilterOperation.EQUALS: return 'baseLayout.filterBlock.operations.equals';
        case FilterOperation.CONTAINS: return 'baseLayout.filterBlock.operations.contains';
        case FilterOperation.IS_EMPTY: return 'baseLayout.filterBlock.operations.isEmpty';
        case FilterOperation.IS_NOT_EMPTY: return 'baseLayout.filterBlock.operations.isNotEmpty';
        case FilterOperation.START_WITH: return 'baseLayout.filterBlock.operations.startWith';
        case FilterOperation.END_WITH: return 'baseLayout.filterBlock.operations.endWith';
        case FilterOperation.MORE_THEN: return 'baseLayout.filterBlock.operations.moreThen';
        case FilterOperation.LESS_THEN: return 'baseLayout.filterBlock.operations.lessThen';
        case FilterOperation.BETWEEN: return 'baseLayout.filterBlock.operations.between';
        case FilterOperation.IN_LIST: return 'baseLayout.filterBlock.operations.inList';
        case FilterOperation.NOT_IN_LIST: return 'baseLayout.filterBlock.operations.notInList';
        default: return type;
    }
}

export function gettingOperationsByType(type) {
    let operations = Array.of(FilterOperation.IS_EMPTY, FilterOperation.IS_NOT_EMPTY);
    if(type) {
        switch (type) {
            case 'IDS': { //textarea
                return Array.of(FilterOperation.EQUALS,
                    FilterOperation.IN_LIST,
                    FilterOperation.NOT_IN_LIST);
            }
            case 'TEXT': { // textfield
                return operations.concat(FilterOperation.CONTAINS,
                    FilterOperation.START_WITH,
                    FilterOperation.END_WITH);
            }
            case 'NUMBER': { //numberfield
                return operations.concat(FilterOperation.EQUALS,
                    FilterOperation.MORE_THEN,
                    FilterOperation.LESS_THEN,
                    FilterOperation.BETWEEN);
            }
            case 'LIST':
            case 'SELECT':
            case 'MULTI': {//combobox
                return operations.concat(FilterOperation.EQUALS,
                    FilterOperation.IN_LIST,
                    FilterOperation.NOT_IN_LIST);
            }
            case 'DATE': {//calendar
                return operations.concat(FilterOperation.MORE_THEN,
                    FilterOperation.LESS_THEN,
                    FilterOperation.BETWEEN);
            }
        }
    }
    return operations;
}

export default class FilterItem {
    title = null;
    type = FilterType.NONE;
    filterField = null;
    defaultVal = null;
    required = false;
    operations = [];
    unit = null;
    values = [];

    static build(title, type, filterField, required, operation, defaultVal, unit, values) {
        let item = new FilterItem();
        item.title = title;
        item.type = type;
        item.filterField = filterField;
        item.required = required;
        item.operations = operation;
        item.defaultVal = defaultVal;
        item.unit = unit;
        item.values = values;
        return item;
    }

    static buildIds(title, filterField, required) {
        return FilterItem.build(title, FilterType.IDS, filterField, required, gettingOperationsByType(FilterType.IDS), null, null, null);
    }

    static buildText(title, filterField, required, defaultVal = null) {
        return FilterItem.build(title, FilterType.TEXT, filterField,required, gettingOperationsByType(FilterType.TEXT), defaultVal, null, null);
    }

    static buildNumber(title, filterField, required, defaultVal = null, unit = null) {
        return FilterItem.build(title, FilterType.NUMBER, filterField, required, gettingOperationsByType(FilterType.NUMBER), defaultVal, unit, null);
    }

    static buildSelect(title, filterField, required, defaultVal = null, values = []) {
        return FilterItem.build(title, FilterType.SELECT, filterField, required, gettingOperationsByType(FilterType.SELECT), defaultVal, null, values);
    }

    static buildList(title, filterField, required, defaultVal = null, values = []) {
        return FilterItem.build(title, FilterType.LIST, filterField, required, gettingOperationsByType(FilterType.LIST), defaultVal, null, values);
    }

    static buildMulti(title, filterField, required, defaultVal = null, values = []) {
        return FilterItem.build(title, FilterType.MULTI, filterField, required, gettingOperationsByType(FilterType.MULTI), defaultVal, null, values);
    }

    static buildDate(title, filterField, required, defaultVal = null) {
        return FilterItem.build(title, FilterType.DATE, filterField, required, gettingOperationsByType(FilterType.DATE), defaultVal, null, null);
    }
}
