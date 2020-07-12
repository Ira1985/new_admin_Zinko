//export function pluralize(count, options = ['объектов', 'объект', 'объекта']) {
export function pluralize(count, options = ['baseEntity.plurals.first', 'baseEntity.plurals.second', 'baseEntity.plurals.third']) {
    const d = count % 100;

    if (10 < d && d < 20) {
        return options[0];
    }

    switch (count % 10) {
        case 1:
            return options[1];
        case 2:
        case 3:
        case 4:
            return options[2];
        default:
            return options[0];
    }
}

export function pluralizeServices(count, options = ['объект', 'объекта', 'объектов', 'объекты']) {
    const d = count % 100;

    if (10 < d && d < 20) {
        return options[2];
    }

    switch (count % 10) {
        case 1:
            return options[0];
        case 2:
        case 3:
        case 4:
            return options[1];
        default:
            return options[2];
    }
}

const escapeLikeRe = /([\\({[.\])+?*$])/g;
const makeLikeFilterFunction = (filters, needsCI = true) => {
    const ff = Object.create(null);
    const flags = needsCI ? 'i': '';

    for (const key in filters) {
        if (!filters.hasOwnProperty(key)) continue;

        let val = filters[key];

        if (null === val || '' === val || '%' === val) continue;

        let fromStart = true;

        if (val.startsWith('%')) {
            fromStart = false;
            val = val.substring(1);
        }

        let pattern = val.replace(escapeLikeRe, '\\$1');

        if (fromStart) pattern = '^' + pattern;

        ff[key] = new RegExp(pattern, flags);
    }

    return (item) => {
        for (const key in ff) {
            // noinspection JSUnfilteredForInLoop
            if (!ff[key].test(item[key])) return false;
        }

        return true;
    };
};

export function filterByLikeCI(source, filters) {
    const ff = makeLikeFilterFunction(filters);

    return source.filter(ff);
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
