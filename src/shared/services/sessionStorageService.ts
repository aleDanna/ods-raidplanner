export default {

    saveOrUpdate(key, json) {
        sessionStorage.setItem(key, JSON.stringify(json));
    },

    get(key) {
        return JSON.parse(<string>sessionStorage.getItem(key));
    },
    remove(key) {
        sessionStorage.removeItem(key);
    }
}
