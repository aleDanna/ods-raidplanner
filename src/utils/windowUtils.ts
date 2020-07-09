import sessionStorageService from "@shared/services/sessionStorageService";

export default {
    reload(user?) {
        if (user) {
            sessionStorageService.saveOrUpdate("loggedUser", user);
        }
        window.location.reload();
    }
}
