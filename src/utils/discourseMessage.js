"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const badges_1 = require("../badges");
const ethers_1 = require("ethers");
const badgeMap_1 = require("./badgeMap");
const lodash_1 = require("lodash");
const DISCOURSE_BADGES_API = process.env.DISCOURSE_BADGES_API;
const DISCOURSE_API_USERNAME = process.env.DISCOURSE_API_USERNAME;
const DISCOURSE_FORUM_URL = process.env.DISCOURSE_FORUM_URL;
const DISCOURSE_USER_BADGES_URL = process.env.DISCOURSE_USER_BADGES_URL;
// ################################
let success = false;
let signer = undefined;
let badgeIds = [];
let badges = [];
let errors = [];
// ################################
// (((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))
// (((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))
const discourseMessage = async (query) => {
    errors = [];
    badgeIds = [];
    badges = [];
    return new Promise(async (resolve, reject) => {
        if (isBlank(query)) {
            errors.push("Missing query params");
            reject(responseObject());
        }
        if (!VerifyMessage(query)) {
            reject(responseObject());
        }
        badges_1.getBadgesForAddress(signer)
            .then(makerBadges => { query.makerBadges = makerBadges; return query; })
            .then(query => { return getUnlockedBadges(query); })
            .then(query => { return getUserBadges(query); })
            .then(query => { return grantUnlockedBadges(query); })
            .then(keepPromises => { return Promise.all(keepPromises); })
            .then(() => { success = true; resolve(responseObject()); })
            .catch(error => {
            errors.push(error);
            reject(responseObject());
        });
    });
};
// (((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))
// (((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const VerifyMessage = async (msg) => {
    try {
        signer = ethers_1.ethers.utils.verifyMessage(msg.username, msg.signature);
        if (signer && signer.toLowerCase() !== msg.address.toLowerCase())
            return false;
    }
    catch (error) {
        errors.push(error);
        return false;
    }
    finally {
        if (signer) {
            return true;
        }
        return false;
    }
};
const grantUnlockedBadges = (query) => {
    if (!query.unlockedBadges) {
        errors.push("No unlocked badges available");
        return;
    }
    if (query.unlockedBadges.length === 0) {
        errors.push("No eligible badges found.");
        return;
    }
    return query.unlockedBadges.map(async (badge) => {
        if (Object.keys(badgeMap_1.badgeMap).includes(badge.id.toString())) {
            // if user already unlocked badge, then move on to the next one
            if (lodash_1.includes(query.userBadges.map(b => b.id), badgeMap_1.badgeMap[badge.id])) {
                errors.push(`Badge [${badgeMap_1.badgeMap[badge.id]}] '${badge.name}' already unlocked for ${query.username}`);
                badges.push(badge);
                return new Promise(resolve => resolve(badge));
            }
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Api-Username": `${DISCOURSE_API_USERNAME}`,
                    "Api-Key": `${DISCOURSE_BADGES_API}`,
                },
                body: JSON.stringify({
                    username: query.username,
                    badge_id: badgeMap_1.badgeMap[badge.id],
                }),
            };
            const response = await node_fetch_1.default(`${DISCOURSE_FORUM_URL}`, requestOptions);
            const json = await response.json();
            if (response.status === 200) {
                badgeIds.push(badgeMap_1.badgeMap[badge.id]);
                badges.push(badge);
            }
            return json;
        }
    });
};
const getUnlockedBadges = (query) => { query.unlockedBadges = filterUnlockedBadges(query.makerBadges); return query; };
const getUserBadges = async (query) => { query.userBadges = await getUserBadgesFor(query.username); return query; };
const filterUnlockedBadges = (makerBadges) => {
    return makerBadges.filter(b => { return b.unlocked === 1; });
};
const getUserBadgesFor = (username) => {
    return new Promise(async (resolve) => {
        let userAccount = await node_fetch_1.default(`${DISCOURSE_USER_BADGES_URL}/${username}.json`);
        let userBadges = await userAccount.json();
        resolve(userBadges.badges);
    });
};
const isBlank = value => { return (lodash_1.isEmpty(value) && !lodash_1.isNumber(value)) || lodash_1.isNaN(value); };
const responseObject = () => { return { success, errors, badgeIds, badges }; };
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
exports.default = discourseMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY291cnNlTWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpc2NvdXJzZU1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBK0I7QUFDL0Isc0NBQWdEO0FBQ2hELG1DQUFnQztBQUNoQyx5Q0FBc0M7QUFDdEMsbUNBQTREO0FBRTVELE1BQU0sb0JBQW9CLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBcUIsQ0FBQztBQUN2RSxNQUFNLHNCQUFzQixHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXVCLENBQUM7QUFDM0UsTUFBTSxtQkFBbUIsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFvQixDQUFDO0FBQ3JFLE1BQU0seUJBQXlCLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBMEIsQ0FBQztBQUVqRixtQ0FBbUM7QUFDbkMsSUFBSSxPQUFPLEdBQVksS0FBSyxDQUFDO0FBQzdCLElBQUksTUFBTSxHQUFRLFNBQVMsQ0FBQztBQUM1QixJQUFJLFFBQVEsR0FBVSxFQUFFLENBQUM7QUFDekIsSUFBSSxNQUFNLEdBQVUsRUFBRSxDQUFDO0FBQ3ZCLElBQUksTUFBTSxHQUFVLEVBQUUsQ0FBQztBQUN2QixtQ0FBbUM7QUFFbkMsdUZBQXVGO0FBQ3ZGLHVGQUF1RjtBQUN2RixNQUFNLGdCQUFnQixHQUFHLEtBQUssRUFBQyxLQUFLLEVBQUMsRUFBRTtJQUNyQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFFeEMsT0FBTyxJQUFJLE9BQU8sQ0FBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBRTVDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFD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