export const catalogService = {
    getList,
    getItem
};

function getList() {
    let token = JSON.parse(localStorage.getItem('cs_user')).token;
    let val = `Bearer ${token}`;
    let options = {};
    options.headers = {};
    options.headers.Authorization = val;

    return fetch("http://212.24.48.52:8080/content/products/", options).then(res => res.json()).then(res => {
        return  res;
    })
}

function getItem(id) {
    let token = JSON.parse(localStorage.getItem('cs_user')).token;
    let val = `Bearer ${token}`;
    let options = {};
    options.headers = {};
    options.headers.Authorization = val;

    return fetch("http://212.24.48.52:8080/content/products/" + id + "/preview", options).then(res => res.json()).then(res => {
        return  res;
    })
}