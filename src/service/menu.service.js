export class MenuService {

    data = [
        {
            "key": "0",
            "label": "Классификация и Категоризация",
            'leaf': false,
            "children": [{
                "key": "0-0",
                "label": "Категоризация",
                'leaf': true,
                "path":'/categories'
            },
                {
                    "key": "0-1",
                    "label": "Классификация",
                    'leaf': false,
                    "children": [
                        { "key": "0-1-0", "label": "Производители", 'leaf': true, "path":'/manufacturers' },
                        { "key": "0-1-1", "label": "Бренды", 'leaf': true, "path":'/brands' },
                        { "key": "0-1-2", "label": "Страны мира", 'leaf': true }
                    ]
                },
                {
                    "key": "0-2",
                    "label": "Дополнительный класификатор",
                    'leaf': true
                },]
        },
        {
            "key": "1",
            "label": "Номерклатура",
            'leaf': false,
            "children": [
                { "key": "1-0", "label": "Посмотреть", 'leaf': true },
                { "key": "1-1", "label": "Создать", 'leaf': true }]
        },
        {
            "key": "2",
            "label": "Информационные модели",
            'leaf': false,
            "children": [
                { "key": "2-0", "label": "Характеристики", 'leaf': true },
                { "key": "2-1", "label": "Список подстановок", 'leaf': true },
                { "key": "2-2", "label": "Единицы измерения", 'leaf': true },
                { "key": "2-3", "label": "Группы атрибутов", 'leaf': true }]
        },
        {
            "key": "3",
            "label": "Заказчики",
            'leaf': false,
            "children": [
                { "key": "3-0", "label": "Посмотреть/Создать", 'leaf': true },
                { "key": "3-1", "label": "Имформационные модели", 'leaf': false, "children": [
                        { "key": "3-1-0", "label": "Категоризация", 'leaf': true },
                        { "key": "3-1-1", "label": "Модели", 'leaf': true }]
                },
                { "key": "3-1", "label": "Каталог/Привязка моделей", 'leaf': true }]
        },
        {
            "key": "4",
            "label": "Экспорт",
            'leaf': false,
            "children": [
                { "key": "4-0", "label": "Экспортные шаблоны", 'leaf': true }]
        },
        {
            "key": "5",
            "label": "Админка",
            'leaf': false,
            "children": [
                { "key": "5-0", "label": "Пользователи", 'leaf': true },
                { "key": "5-1", "label": "Департаменты", 'leaf': true },
                { "key": "5-2", "label": "Роли", 'leaf': true },
                { "key": "5-3", "label": "Допуски", 'leaf': true }]
        },
    ];

    getMenu() {
        return this.data
    }
}