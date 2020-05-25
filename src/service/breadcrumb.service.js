export class BreadcrumbService {

    data = [
        {
            "label": "Главная",
        }
    ];

    getBreadcrumb() {
        return this.data
    }

    addBreadcrumb(item) {
        let obj = {
            'label': item,
        }
        this.data.push(obj)
    }
}