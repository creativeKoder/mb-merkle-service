"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkConsecutiveGovernancePollsCount = exports.checkGovernancePollsCount = void 0;
const clients_1 = require("../apollo/clients");
const governance_1 = require("../apollo/queries/governance");
async function checkGovernancePollsCount(address, count) {
    const result = await clients_1.governanceClient.query({
        query: governance_1.USER_POLL_VOTES_QUERY,
        fetchPolicy: "cache-first",
        variables: {
            address: address.toLowerCase(),
        },
    });
    if (result.data.votePollActions.length >= count) {
        return 1;
    }
    else {
        return 0;
    }
}
exports.checkGovernancePollsCount = checkGovernancePollsCount;
async function checkConsecutiveGovernancePollsCount(address, count) {
    return 1;
}
exports.checkConsecutiveGovernancePollsCount = checkConsecutiveGovernancePollsCount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ292ZXJuYW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdvdmVybmFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0NBQXFEO0FBQ3JELDZEQUFxRTtBQUU5RCxLQUFLLFVBQVUseUJBQXlCLENBQzdDLE9BQWUsRUFDZixLQUFhO0lBRWIsTUFBTSxNQUFNLEdBQUcsTUFBTSwwQkFBZ0IsQ0FBQyxLQUFLLENBQUM7UUFDMUMsS0FBSyxFQUFFLGtDQUFxQjtRQUM1QixXQUFXLEVBQUUsYUFBYTtRQUMxQixTQUFTLEVBQUU7WUFDVCxPQUFPLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRTtTQUMvQjtLQUNGLENBQUMsQ0FBQztJQUNILElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxJQUFJLEtBQUssRUFBRTtRQUMvQyxPQUFPLENBQUMsQ0FBQztLQUNWO1NBQU07UUFDTCxPQUFPLENBQUMsQ0FBQztLQUNWO0FBQ0gsQ0FBQztBQWhCRCw4REFnQkM7QUFFTSxLQUFLLFVBQVUsb0NBQW9DLENBQ3hELE9BQWUsRUFDZixLQUFhO0lBRWIsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBTEQsb0ZBS0MifQ==