import { mockService} from "./mock-service";

export default {

    getAvailableRaidGroups(userId)  {
        return mockService.getRaidGroups();
    },

    getAvailableRaids(raidPlanId) {

    },

    subscribe(userId, character, raidId) {

    },

    raidSubscriptions(userId) {

    },

    deleteSubscription(subscriptionId) {

    },

    updateSubscription(userId, subscriptionId, character) {

    }
};
