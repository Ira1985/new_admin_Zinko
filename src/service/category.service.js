export const categoryService = {
    getList,
    getChildren
};

function getList(path) {
    let token = sessionStorage.getItem("tokenData");
    let val = `Bearer ${token}`;
    let options = {};
    options.headers = {};
    options.headers.Authorization = val;
    let url = "http://212.24.48.52:8080/content/categories/";

    return fetch(url, options).then(res => res.json()).then(res => {
        return  res;
    })
}

function getChildren(path) {
    let token = sessionStorage.getItem("tokenData");
    let val = `Bearer ${token}`;
    let options = {};
    options.headers = {};
    options.headers.Authorization = val;
    let url = "http://212.24.48.52:8080/content/categories/?parentId=" + path.slice(-6, path.length-1);


    return fetch(url, options).then(res => res.json()).then(res => {
        return  res;
    })
}