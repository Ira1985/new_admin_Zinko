export const manufacturerService = {
    getList
};

function getList() {
    let token = sessionStorage.getItem("tokenData");
    let val = `Bearer ${token}`;
    let options = {};
    options.headers = {};
    options.headers.Authorization = val;

    return fetch("http://212.24.48.52:8080/content/manufacturers/", options).then(res => res.json()).then(res => {
        return  res;
    })
}