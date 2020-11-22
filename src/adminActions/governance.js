"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.earlyExecutiveVoteAddressesForTime = exports.spellVoteAddressesForFrequency = exports.allExecutiveSpellAddressesWithTimestamps = exports.allExecutiveSpellAddresses = exports.earlyPollVoteAddressesForTime = exports.consecutivePollVoteAddressesForFrequency = exports.pollVoteAddressesForFrequency = exports.allGovernancePollAddressesWithTimestamps = exports.allGovernancePollAddressesWithPollId = exports.allGovernancePollAddresses = void 0;
const R = require("ramda");
const _ = require("lodash");
const clients_1 = require("../apollo/clients");
const governance_1 = require("../apollo/queries/governance");
const utils_1 = require("../utils");
const constants_1 = require("../constants");
// GOVERNANCE POLLS
async function allGovernancePollAddresses() {
    let wholeResult = [];
    let b = true;
    let i = 0;
    while (b === true) {
        i = i + 1;
        const result = await clients_1.governanceClient.query({
            query: governance_1.ALL_POLL_VOTES_QUERY,
            fetchPolicy: "cache-first",
            variables: {
                skip: i * constants_1.SUBGRAPH_BATCHES,
            },
        });
        if (result.data.votePollActions.length > 0) {
            wholeResult.push.apply(wholeResult, result.data.votePollActions);
        }
        else {
            b = false;
        }
    }
    return wholeResult.map((action) => {
        return action.sender;
    });
}
exports.allGovernancePollAddresses = allGovernancePollAddresses;
async function allGovernancePollAddressesWithPollId() {
    let wholeResult = [];
    let b = true;
    let i = 0;
    while (b === true) {
        i = i + 1;
        const result = await clients_1.governanceClient.query({
            query: governance_1.ALL_POLL_VOTES_QUERY,
            fetchPolicy: "cache-first",
            variables: {
                skip: i * constants_1.SUBGRAPH_BATCHES,
            },
        }).catch(err => console.log(err));
        if (result.data.votePollActions.length > 0) {
            wholeResult.push.apply(wholeResult, result.data.votePollActions);
        }
        else {
            b = false;
        }
    }
    return wholeResult.map((action) => {
        return { sender: action.sender, pollId: action.poll.pollId };
    });
}
exports.allGovernancePollAddressesWithPollId = allGovernancePollAddressesWithPollId;
async function allGovernancePollAddressesWithTimestamps() {
    let wholeResult = [];
    let b = true;
    let i = 0;
    while (b === true) {
        i = i + 1;
        const result = await clients_1.governanceClient.query({
            query: governance_1.ALL_EARLY_POLL_VOTES_QUERY,
            fetchPolicy: "cache-first",
            variables: {
                skip: i * constants_1.SUBGRAPH_BATCHES,
            },
        }).catch(err => console.log(err));
        if (result.data.votePollActions.length > 0) {
            wholeResult.push.apply(wholeResult, result.data.votePollActions);
        }
        else {
            b = false;
        }
    }
    return wholeResult.map((action) => {
        return {
            sender: action.sender,
            createdTimestamp: action.poll.startDate,
            votedTimestamp: action.timestamp
        };
    });
}
exports.allGovernancePollAddressesWithTimestamps = allGovernancePollAddressesWithTimestamps;
function pollVoteAddressesForFrequency(frequency, addressList) {
    const pollVoteFreq = utils_1.addressListFilteredByFrequency(addressList);
    const greaterThanOrEqualToFrequency = (x) => {
        return x.frequency >= frequency;
    };
    const _addressList = _.filter(pollVoteFreq, greaterThanOrEqualToFrequency);
    const _addresses = _.map(_addressList, 'address');
    const _progress = utils_1.mapFrequenciesToProgressObject(pollVoteFreq, frequency);
    return {
        addresses: _addresses,
        progress: _progress,
    };
}
exports.pollVoteAddressesForFrequency = pollVoteAddressesForFrequency;
const addressListFilteredForConsecutive = (list) => {
    return _.map(_.uniq(list), ((x) => {
        return {
            address: x.sender,
            frequency: utils_1.longestConsecutiveCount(list.filter(_poll => {
                // get pollIds for current address
                if (_poll.sender === x.sender) {
                    return _poll.pollId;
                }
                return null;
            }).map(function (el) {
                // return an array of pollIds for each address
                return parseInt(el.pollId);
            }))
        };
    }));
};
function consecutivePollVoteAddressesForFrequency(frequency, addressList) {
    const consecutivePollVoteFreq = addressListFilteredForConsecutive(addressList);
    const greaterThanOrEqualToFrequency = (x) => {
        return x.frequency >= frequency;
    };
    const _addressList = _.filter(consecutivePollVoteFreq, greaterThanOrEqualToFrequency);
    const _addresses = _.map(_addressList, 'address');
    const _progress = utils_1.mapFrequenciesToProgressObject(consecutivePollVoteFreq, frequency);
    return {
        addresses: _addresses,
        progress: _progress,
    };
}
exports.consecutivePollVoteAddressesForFrequency = consecutivePollVoteAddressesForFrequency;
const addressListFilteredByTime = (list, time) => {
    return _.map(_.uniq(list), ((x) => {
        return {
            address: x,
            frequency: _.size(_.filter(list, (poll) => {
                // get pollIds for current address
                return poll.sender === poll.sender && (poll.votedTimestamp - poll.createdTimestamp) < time;
            }))
        };
    }));
};
function earlyPollVoteAddressesForTime(time, addressList) {
    const earlyPollVoteFreq = addressListFilteredByTime(addressList, time);
    const filterByFreqGtZero = (obj) => {
        if (R.gt(obj.frequency, 0)) {
            return obj.address;
        }
        return;
    };
    const _addresses = _.compact(_.map(earlyPollVoteFreq, filterByFreqGtZero));
    return {
        addresses: _addresses,
        progress: {}
    };
}
exports.earlyPollVoteAddressesForTime = earlyPollVoteAddressesForTime;
// EXECUTIVE PROPOSALS (SPELLS)
async function allExecutiveSpellAddresses() {
    let wholeResult = [];
    let b = true;
    let i = 0;
    while (b === true) {
        i = i + 1;
        const result = await clients_1.governanceClient.query({
            query: governance_1.ALL_SPELL_VOTES_QUERY,
            fetchPolicy: "cache-first",
            variables: {
                skip: i * 1000,
            },
        });
        if (result.data.addActions.length > 0) {
            wholeResult.push.apply(wholeResult, result.data.addActions);
        }
        else {
            b = false;
        }
    }
    return wholeResult.map((action) => {
        return action.sender;
    });
}
exports.allExecutiveSpellAddresses = allExecutiveSpellAddresses;
async function allExecutiveSpellAddressesWithTimestamps() {
    let wholeResult = [];
    let b = true;
    let i = 0;
    while (b === true) {
        i = i + 1;
        const result = await clients_1.governanceClient.query({
            query: governance_1.ALL_EARLY_SPELL_VOTES_QUERY,
            fetchPolicy: "cache-first",
            variables: {
                skip: i * 1000,
            },
        });
        if (result.data.addActions.length > 0) {
            wholeResult.push.apply(wholeResult, result.data.addActions);
        }
        else {
            b = false;
        }
    }
    return wholeResult.map((action) => {
        return {
            sender: action.sender,
            createdTimestamp: action.spell.timestamp,
            votedTimestamp: action.timestamp
        };
    });
}
exports.allExecutiveSpellAddressesWithTimestamps = allExecutiveSpellAddressesWithTimestamps;
function spellVoteAddressesForFrequency(frequency, addressList) {
    const spellVoteFreq = utils_1.addressListFilteredByFrequency(addressList);
    const greaterThanOrEqualToFrequency = (x) => {
        return x.frequency >= frequency;
    };
    const _addressList = _.filter(spellVoteFreq, greaterThanOrEqualToFrequency);
    const _addresses = _.map(_addressList, 'address');
    const _progress = utils_1.mapFrequenciesToProgressObject(spellVoteFreq, frequency);
    return {
        addresses: _addresses,
        progress: _progress,
    };
}
exports.spellVoteAddressesForFrequency = spellVoteAddressesForFrequency;
function earlyExecutiveVoteAddressesForTime(time, addressList) {
    const earlySpellVoteFreq = addressListFilteredByTime(addressList, time);
    const _addresses = _.map(_.map(earlySpellVoteFreq, (obj) => { return R.gt(obj.frequency, 0); }), 'address');
    const _progress = {}; // need to deal with time in --> mapFrequenciesToProgressObject(time, filterEarlySpellVoteFreq)
    return {
        addresses: _addresses,
        progress: _progress
    };
}
exports.earlyExecutiveVoteAddressesForTime = earlyExecutiveVoteAddressesForTime;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ292ZXJuYW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdvdmVybmFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkJBQTJCO0FBQzNCLDRCQUE0QjtBQUU1QiwrQ0FBcUQ7QUFDckQsNkRBTXNDO0FBQ3RDLG9DQUlrQjtBQUNsQiw0Q0FFc0I7QUFFdEIsbUJBQW1CO0FBRVosS0FBSyxVQUFVLDBCQUEwQjtJQUM5QyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDckIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ2pCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsTUFBTSxNQUFNLEdBQUcsTUFBTSwwQkFBZ0IsQ0FBQyxLQUFLLENBQUM7WUFDMUMsS0FBSyxFQUFFLGlDQUFvQjtZQUMzQixXQUFXLEVBQUUsYUFBYTtZQUMxQixTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLENBQUMsR0FBRyw0QkFBZ0I7YUFDM0I7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDMUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDbEU7YUFBTTtZQUNMLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDWDtLQUNGO0lBRUQsT0FBTyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBVyxFQUFFLEVBQUU7UUFDckMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXZCRCxnRUF1QkM7QUFFTSxLQUFLLFVBQVUsb0NBQW9DO0lBQ3hELElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUNyQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDVixPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDakIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixNQUFNLE1BQU0sR0FBUSxNQUFNLDBCQUFnQixDQUFDLEtBQUssQ0FBQztZQUMvQyxLQUFLLEVBQUUsaUNBQW9CO1lBQzNCLFdBQVcsRUFBRSxhQUFhO1lBQzFCLFNBQVMsRUFBRTtnQkFDVCxJQUFJLEVBQUUsQ0FBQyxHQUFHLDRCQUFnQjthQUMzQjtTQUNGLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ2xFO2FBQU07WUFDTCxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ1g7S0FDRjtJQUVELE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFO1FBQ3JDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMvRCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF2QkQsb0ZBdUJDO0FBRU0sS0FBSyxVQUFVLHdDQUF3QztJQUM1RCxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDckIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ2pCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsTUFBTSxNQUFNLEdBQVEsTUFBTSwwQkFBZ0IsQ0FBQyxLQUFLLENBQUM7WUFDL0MsS0FBSyxFQUFFLHVDQUEwQjtZQUNqQyxXQUFXLEVBQUUsYUFBYTtZQUMxQixTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLENBQUMsR0FBRyw0QkFBZ0I7YUFDM0I7U0FDRixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMxQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNsRTthQUFNO1lBQ0wsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUNYO0tBQ0Y7SUFFRCxPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtRQUNyQyxPQUFPO1lBQ0wsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztZQUN2QyxjQUFjLEVBQUUsTUFBTSxDQUFDLFNBQVM7U0FDakMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTNCRCw0RkEyQkM7QUFFRCxTQUFnQiw2QkFBNkIsQ0FDM0MsU0FBaUIsRUFDakIsV0FBcUI7SUFFckIsTUFBTSxZQUFZLEdBQUcsc0NBQThCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFakUsTUFBTSw2QkFBNkIsR0FBRyxDQUFDLENBQXlDLEVBQUUsRUFBRTtRQUNsRixPQUFPLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDO0lBQ2xDLENBQUMsQ0FBQTtJQUVELE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLDZCQUE2QixDQUFDLENBQUE7SUFDMUUsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFFakQsTUFBTSxTQUFTLEdBQUcsc0NBQThCLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBRXpFLE9BQU87UUFDTCxTQUFTLEVBQUUsVUFBVTtRQUNyQixRQUFRLEVBQUUsU0FBUztLQUNwQixDQUFDO0FBQ0osQ0FBQztBQW5CRCxzRUFtQkM7QUFFRCxNQUFNLGlDQUFpQyxHQUFHLENBQUMsSUFBMEMsRUFBRSxFQUFFO0lBQ3ZGLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNoQyxPQUFPO1lBQ0wsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNO1lBQ2pCLFNBQVMsRUFBRSwrQkFBdUIsQ0FDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDbEIsa0NBQWtDO2dCQUNsQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRTtvQkFDN0IsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFBO2lCQUNwQjtnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ2pCLDhDQUE4QztnQkFDOUMsT0FBTyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzVCLENBQUMsQ0FBQyxDQUNIO1NBQ0YsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUE7QUFFRCxTQUFnQix3Q0FBd0MsQ0FDdEQsU0FBaUIsRUFDakIsV0FBaUQ7SUFFakQsTUFBTSx1QkFBdUIsR0FBRyxpQ0FBaUMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUU5RSxNQUFNLDZCQUE2QixHQUFHLENBQUMsQ0FBeUMsRUFBRSxFQUFFO1FBQ2xGLE9BQU8sQ0FBQyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUM7SUFDbEMsQ0FBQyxDQUFBO0lBRUQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSw2QkFBNkIsQ0FBQyxDQUFBO0lBQ3JGLE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBR2pELE1BQU0sU0FBUyxHQUFHLHNDQUE4QixDQUFDLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBRXBGLE9BQU87UUFDTCxTQUFTLEVBQUUsVUFBVTtRQUNyQixRQUFRLEVBQUUsU0FBUztLQUNwQixDQUFBO0FBQ0gsQ0FBQztBQXBCRCw0RkFvQkM7QUFFRCxNQUFNLHlCQUF5QixHQUFHLENBQUMsSUFBVyxFQUFFLElBQVksRUFBUyxFQUFFO0lBQ3JFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNoQyxPQUFPO1lBQ0wsT0FBTyxFQUFFLENBQUM7WUFDVixTQUFTLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUN4QyxrQ0FBa0M7Z0JBQ2xDLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUE7WUFDNUYsQ0FBQyxDQUFDLENBQUM7U0FDSixDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQztBQUVGLFNBQWdCLDZCQUE2QixDQUMzQyxJQUFZLEVBQ1osV0FBbUY7SUFHbkYsTUFBTSxpQkFBaUIsR0FBRyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFFdEUsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLEdBQTJDLEVBQUUsRUFBRTtRQUN6RSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUFFLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQztTQUFFO1FBQ25ELE9BQU87SUFDVCxDQUFDLENBQUM7SUFFRixNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0lBRTNFLE9BQU87UUFDTCxTQUFTLEVBQUUsVUFBVTtRQUNyQixRQUFRLEVBQUUsRUFBRTtLQUNiLENBQUE7QUFDSCxDQUFDO0FBbEJELHNFQWtCQztBQUVELCtCQUErQjtBQUV4QixLQUFLLFVBQVUsMEJBQTBCO0lBQzlDLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUNyQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDVixPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDakIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixNQUFNLE1BQU0sR0FBRyxNQUFNLDBCQUFnQixDQUFDLEtBQUssQ0FBQztZQUMxQyxLQUFLLEVBQUUsa0NBQXFCO1lBQzVCLFdBQVcsRUFBRSxhQUFhO1lBQzFCLFNBQVMsRUFBRTtnQkFDVCxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUk7YUFDZjtTQUNGLENBQUMsQ0FBQztRQUNILElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM3RDthQUFNO1lBQ0wsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUNYO0tBQ0Y7SUFFRCxPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtRQUNyQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBdkJELGdFQXVCQztBQUVNLEtBQUssVUFBVSx3Q0FBd0M7SUFDNUQsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNqQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLE1BQU0sTUFBTSxHQUFHLE1BQU0sMEJBQWdCLENBQUMsS0FBSyxDQUFDO1lBQzFDLEtBQUssRUFBRSx3Q0FBMkI7WUFDbEMsV0FBVyxFQUFFLGFBQWE7WUFDMUIsU0FBUyxFQUFFO2dCQUNULElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSTthQUNmO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzdEO2FBQU07WUFDTCxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ1g7S0FDRjtJQUVELE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFO1FBQ3JDLE9BQU87WUFDTCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ3hDLGNBQWMsRUFBRSxNQUFNLENBQUMsU0FBUztTQUNqQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBM0JELDRGQTJCQztBQUVELFNBQWdCLDhCQUE4QixDQUM1QyxTQUFpQixFQUNqQixXQUFxQjtJQUVyQixNQUFNLGFBQWEsR0FBRyxzQ0FBOEIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUVsRSxNQUFNLDZCQUE2QixHQUFHLENBQUMsQ0FBeUMsRUFBRSxFQUFFO1FBQ2xGLE9BQU8sQ0FBQyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUM7SUFDbEMsQ0FBQyxDQUFBO0lBRUQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsNkJBQTZCLENBQUMsQ0FBQTtJQUMzRSxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUVqRCxNQUFNLFNBQVMsR0FBRyxzQ0FBOEIsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFFMUUsT0FBTztRQUNMLFNBQVMsRUFBRSxVQUFVO1FBQ3JCLFFBQVEsRUFBRSxTQUFTO0tBQ3BCLENBQUM7QUFDSixDQUFDO0FBbkJELHdFQW1CQztBQUVELFNBQWdCLGtDQUFrQyxDQUNoRCxJQUFZLEVBQ1osV0FBbUY7SUFFbkYsTUFBTSxrQkFBa0IsR0FBRyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFFdkUsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBRTFHLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQSxDQUFDLCtGQUErRjtJQUVwSCxPQUFPO1FBQ0wsU0FBUyxFQUFFLFVBQVU7UUFDckIsUUFBUSxFQUFFLFNBQVM7S0FDcEIsQ0FBQTtBQUNILENBQUM7QUFkRCxnRkFjQyJ9