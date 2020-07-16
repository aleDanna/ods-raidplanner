export default {
  saveOrUpdate(key: any, json: any) {
    sessionStorage.setItem(key, JSON.stringify(json));
  },

  get(key: any) {
    return JSON.parse(<string>sessionStorage.getItem(key));
  },
  remove(key: any) {
    sessionStorage.removeItem(key);
  }
};
