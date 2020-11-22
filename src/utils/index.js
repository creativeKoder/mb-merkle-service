"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.longestConsecutiveCount = exports.checkForProxyAddresses = exports.checkTemplateProgressForAddressList = exports.checkTemplateAddressesForAddressList = exports.addressListFilteredByFrequency = exports.mapFrequenciesToProgressObject = void 0;
const _ = require("lodash");
const clients_1 = require("../apollo/clients");
const governance_1 = require("../apollo/queries/governance");
function mapFrequenciesToProgressObject(freqMap, frequency) {
    let progressObject = {};
    _.each(freqMap, function (obj) {
        progressObject[obj.address] = obj.frequency / frequency > 1 ? 1 : obj.frequency / frequency;
    });
    return progressObject;
}
exports.mapFrequenciesToProgressObject = mapFrequenciesToProgressObject;
const addressListFilteredByFrequency = (list) => {
    return _.map(_.uniq(list), ((x) => {
        return {
            address: x,
            frequency: list.filter(y => y === x).length
        };
    }));
};
exports.addressListFilteredByFrequency = addressListFilteredByFrequency;
async function checkTemplateAddressesForAddressList(addressList, addresses) {
    const match = addressList.map(address => {
        if (!address) {
            return 0;
        }
        if (addresses.includes(address.toLowerCase()) === true) {
            return address.toLowerCase();
        }
        else {
            return null;
        }
    });
    var filtered = match.filter(function (el) {
        return el != null;
    });
    var noDupes = [...new Set(filtered)];
    if (noDupes.length > 0) {
        // console.log('unlocked')
        return noDupes[0];
    }
    return '0x';
}
exports.checkTemplateAddressesForAddressList = checkTemplateAddressesForAddressList;
async function checkTemplateProgressForAddressList(addressList, progress) {
    const match = addressList.map(address => {
        if (progress[address.toLowerCase()]) {
            return progress[address.toLowerCase()];
        }
        return 0;
    });
    return Math.max(...match);
}
exports.checkTemplateProgressForAddressList = checkTemplateProgressForAddressList;
const getProxyAddress = async (query, address) => {
    const result = await clients_1.governanceClient.query({
        query: query,
        variables: {
            address: address
        },
        fetchPolicy: "cache-first",
    }).catch(err => console.log(err));
    // deal with multiple voterRegisty entries
    // deal with multiple proxies
    if (result.data.voterRegistries[0]) {
        return result.data.voterRegistries[0]['voteProxies'][0]['id'];
    }
    else {
        return address;
    }
};
async function checkForProxyAddresses(address) {
    const lookup_types = [
        governance_1.PROXY_HOT_LOOKUP_QUERY,
        governance_1.PROXY_COLD_LOOKUP_QUERY
    ];
    // let addresses = [address]
    return Promise.all(lookup_types.map(query => getProxyAddress(query, address)));
}
exports.checkForProxyAddresses = checkForProxyAddresses;
function longestConsecutiveCount(arr) {
    let chunks = [];
    let prev = 0;
    var sorted = arr.sort(function (a, b) { return a - b; });
    sorted.forEach((current) => {
        if (current - prev != 1)
            chunks.push([]);
        chunks[chunks.length - 1].push(current);
        prev = current;
    });
    chunks.sort((a, b) => b.length - a.length);
    return chunks[0].length;
}
exports.longestConsecutiveCount = longestConsecutiveCount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0QkFBNEI7QUFFNUIsK0NBQW9EO0FBQ3BELDZEQUErRjtBQUUvRixTQUFnQiw4QkFBOEIsQ0FDNUMsT0FBaUQsRUFDakQsU0FBaUI7SUFFakIsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBRXhCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsR0FBRztRQUMzQixjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM5RixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sY0FBYyxDQUFDO0FBQ3hCLENBQUM7QUFYRCx3RUFXQztBQUVNLE1BQU0sOEJBQThCLEdBQUcsQ0FBQyxJQUFjLEVBQVMsRUFBRTtJQUN0RSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDaEMsT0FBTztZQUNMLE9BQU8sRUFBRSxDQUFDO1lBQ1YsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTTtTQUM1QyxDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQztBQVBXLFFBQUEsOEJBQThCLGtDQU96QztBQUdLLEtBQUssVUFBVSxvQ0FBb0MsQ0FDeEQsV0FBcUIsRUFDckIsU0FBbUI7SUFHbkIsTUFBTSxLQUFLLEdBQVUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUM3QyxJQUFJLENBQUMs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