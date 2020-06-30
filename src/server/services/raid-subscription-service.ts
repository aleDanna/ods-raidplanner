import { mockService} from "./mock-service";
import persistenceService from "../../server/services/persistence-service";

export default {

    getAvailableRaidGroups(userId)  {
        return mockService.getRaidGroups();
    },

    getAvailableRaids(raidPlanId) {

    },

    subscribe(event, user) {
        return persistenceService.addSubscription(event, user);
    },

    raidSubscriptions(userId) {

    },

    deleteSubscription(subscriptionId) {

    },

    updateSubscription(userId, subscriptionId, character) {

    }
};
