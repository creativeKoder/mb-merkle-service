"use strict";
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bidGuyAddressesForFrequency = exports.allBidGuyAddresses = exports.allBidGuysAllFlippers = exports.bidAddressesForFrequency = exports.allBidAddresses = exports.biteAddressesForFrequency = exports.allBitesAllFlippers = void 0;
const auctions_1 = require("../apollo/queries/auctions");
const clients_1 = require("../apollo/clients");
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const R = require("ramda");
const _ = require("lodash");
const makerAllBitesQuery = function (step = 0, collateral) {
    return __asyncGenerator(this, arguments, function* () {
        const query = yield __await(clients_1.makerClient.query({
            query: auctions_1.ALL_BITES_QUERY,
            fetchPolicy: "cache-first",
            variables: { offset: step * 10000, collateral: collateral },
        }));
        ++step;
        const hasNextPage = R.prop("hasNextPage", query.data.allBites.pageInfo);
        if (!hasNextPage)
            return yield __await({ step, query });
        return yield __await(yield yield __await({ step, query, hasNextPage }));
    });
};
function allBiteAddresses(flipper) {
    return new Promise(async (resolve, reject) => {
        var _a;
        let allResults = [];
        // Generator Function
        let query = makerAllBitesQuery(0, flipper);
        // Invoke GenFunc and start process
        let resultSet = await query.next();
        let nextPage = R.prop("hasNextPage", resultSet.value);
        do {
            const nodes = R.prop("nodes", (_a = resultSet === null || resultSet === void 0 ? void 0 : resultSet.value) === null || _a === void 0 ? void 0 : _a.query.data.allBites);
            if (R.length(nodes) > 0)
                allResults.push(_.map(nodes, "tx.txFrom"));
            if (nextPage)
                resultSet = await query.next();
        } while (resultSet.done === false);
        // Resolve Promise
        resolve(allResults);
    });
}
const allBitesAllFlippers = async () => {
    const results = await Promise.all(R.map(allBiteAddresses, Object.keys(constants_1.collateralFlippers)));
    return _.flattenDeep(results);
};
exports.allBitesAllFlippers = allBitesAllFlippers;
function biteAddressesForFrequency(frequency, biteAddresses) {
    const biteFreq = utils_1.addressListFilteredByFrequency(biteAddresses);
    const greaterThanOrEqualToFrequency = (x) => {
        return x.frequency >= frequency;
    };
    const _addressList = _.filter(biteFreq, greaterThanOrEqualToFrequency);
    const _addresses = _.map(_addressList, 'address');
    const _progress = utils_1.mapFrequenciesToProgressObject(biteFreq, frequency);
    return { addresses: _addresses, progress: _progress };
}
exports.biteAddressesForFrequency = biteAddressesForFrequency;
const makerAllFlipBidsQuery = function (step = 0) {
    return __asyncGenerator(this, arguments, function* () {
        const query = yield __await(clients_1.makerClient.query({
            query: auctions_1.ALL_FLIP_BIDS_QUERY,
            fetchPolicy: "cache-first",
            variables: { offset: step * constants_1.BATCH_QUERIES },
        }));
        ++step;
        const hasNextPage = R.prop("hasNextPage", query.data.allFlipBidEvents.pageInfo);
        return yield __await(yield yield __await({ step, query, hasNextPage }));
        if (!hasNextPage)
            return yield __await({ step, query });
    });
};
function allBidAddresses() {
    return new Promise(async (resolve, reject) => {
        var _a;
        const allResults = [];
        // Generator Function
        let query = makerAllFlipBidsQuery(0);
        // Invoke GenFunc and start process
        let resultSet = await query.next();
        // Deff
        const fillResultsArray = eventNodes => {
            eventNodes.map((bid) => {
                if (bid.act === "TEND" || bid.act === "DENT") {
                    allResults.push(R.prop("txFrom", bid.tx.nodes[0]));
                }
                return;
            });
        };
        // Loop
        do {
            const nodes = R.prop("nodes", (_a = resultSet === null || resultSet === void 0 ? void 0 : resultSet.value) === null || _a === void 0 ? void 0 : _a.query.data.allFlipBidEvents);
            if (R.length(nodes) > 0)
                fillResultsArray(nodes);
            if (_.get(resultSet, 'value.hasNextPage'))
                resultSet = await query.next();
        } while (resultSet.done === false);
        // Resolve Promise
        resolve(allResults);
    });
}
exports.allBidAddresses = allBidAddresses;
// for now, a tend and dent on the same auction are counted as 2 bids
function bidAddressesForFrequency(frequency, addressList) {
    const bidFreq = utils_1.addressListFilteredByFrequency(addressList);
    const greaterThanOrEqualToFrequency = (x) => {
        return x.frequency >= frequency;
    };
    const _addressList = _.filter(bidFreq, greaterThanOrEqualToFrequency);
    const _addresses = _.map(_addressList, 'address');
    const _progress = utils_1.mapFrequenciesToProgressObject(bidFreq, frequency);
    return {
        addresses: _addresses,
        progress: _progress,
    };
}
exports.bidAddressesForFrequency = bidAddressesForFrequency;
const makerAllFlipWinsQuery = function (step = 0, flipper) {
    return __asyncGenerator(this, arguments, function* () {
        console.log(flipper);
        const query = yield __await(clients_1.makerClient.query({
            query: auctions_1.ALL_FLIP_WINS_QUERY,
            fetchPolicy: "cache-first",
            variables: {
                offset: step * constants_1.BATCH_QUERIES,
                flipper: flipper,
            },
        }));
        ++step;
        const hasNextPage = R.prop("hasNextPage", query.data.allFlipBidGuys.pageInfo);
        if (!hasNextPage)
            return yield __await({ step, query });
        return yield __await(yield yield __await({ step, query, hasNextPage }));
    });
};
const addressListFilteredByBidId = (list) => {
    return _.map(_.uniq(list), ((x) => {
        return {
            address: x.guy,
            frequency: _.size(_.filter(list, (bid) => {
                // get pollIds for current address
                return bid.guy === x.guy;
            }))
        };
    }));
};
const allBidGuysAllFlippers = async () => {
    const results = await Promise.all(R.map(allBidGuyAddresses, Object.keys(constants_1.collateralFlippers)));
    // console.log(results);
    return _.flattenDeep(results);
};
exports.allBidGuysAllFlippers = allBidGuysAllFlippers;
async function allBidGuyAddresses(flipper) {
    return new Promise(async (resolve, reject) => {
        var _a;
        const allResults = [];
        // Generator Function
        let query = makerAllFlipWinsQuery(0, constants_1.collateralFlippers[flipper]);
        // Invoke GenFunc and start process
        let resultSet = await query.next();
        // console.log(resultSet?.value?.query.data);
        // Deff
        const fillResultsArray = eventNodes => {
            // console.log(eventNodes);
            eventNodes.map((bid) => {
                allResults.push({
                    guy: R.prop("guy", bid),
                    bidId: R.prop("bidId", bid)
                });
            });
        };
        // Loop
        do {
            const nodes = R.prop("nodes", (_a = resultSet === null || resultSet === void 0 ? void 0 : resultSet.value) === null || _a === void 0 ? void 0 : _a.query.data.allFlipBidGuys);
            if (R.length(nodes) > 0)
                fillResultsArray(nodes);
            if (_.get(resultSet, 'value.hasNextPage'))
                resultSet = await query.next();
        } while (resultSet.done === false);
        // console.log(allResults)
        const zeroPred = R.whereEq({ guy: "0x0000000000000000000000000000000000000000" });
        const sorted = _.orderBy(allResults, ['bidId']);
        const zeroIndexes = _.keys(_.pickBy(sorted, zeroPred));
        const indexes = _.map(zeroIndexes, (x) => Number(++x));
        const filter = _.map(indexes, idx => sorted[idx]);
        // allResults.findIndex(a => a["bidId"] === e["bidId"]) === i;
        const filteredFrequencies = addressListFilteredByBidId(filter);
        // console.log(filter)
        // Resolve Promise
        resolve(filteredFrequencies);
    });
}
exports.allBidGuyAddresses = allBidGuyAddresses;
function bidGuyAddressesForFrequency(frequency, addressList) {
    console.log(addressList);
    // const bidGuyFreq = await allBidGuysAllFlippers();
    const greaterThanOrEqualToFrequency = (x) => {
        return x.frequency >= frequency;
    };
    const _addressList = _.filter(addressList, greaterThanOrEqualToFrequency);
    const _addresses = _.map(_addressList, 'address');
    const _progress = utils_1.mapFrequenciesToProgressObject(addressList, frequency);
    return {
        addresses: _addresses,
        progress: _progress,
    };
}
exports.bidGuyAddressesForFrequency = bidGuyAddressesForFrequency;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFJb0M7QUFDcEMsK0NBQWdEO0FBQ2hELG9DQUdrQjtBQUNsQiw0Q0FHc0I7QUFDdEIsMkJBQTJCO0FBQzNCLDRCQUE0QjtBQUU1QixNQUFNLGtCQUFrQixHQUFHLFVBQWlCLElBQUksR0FBRyxDQUFDLEVBQUUsVUFBa0I7O1FBQ3RFLE1BQU0sS0FBSyxHQUFHLGNBQU0scUJBQVcsQ0FBQyxLQUFLLENBQUM7WUFDcEMsS0FBSyxFQUFFLDBCQUFlO1lBQ3RCLFdBQVcsRUFBRSxhQUFhO1lBQzFCLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEdBQUcsS0FBSyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUU7U0FDNUQsQ0FBQyxDQUFBLENBQUM7UUFFSCxFQUFFLElBQUksQ0FBQztRQUVQLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXhFLElBQUksQ0FBQyxXQUFXO1lBQUUscUJBQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUM7UUFFekMscUJBQU8sb0JBQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxDQUFBLEVBQUM7SUFDNUMsQ0FBQztDQUFBLENBQUM7QUFFRixTQUFTLGdCQUFnQixDQUFDLE9BQWU7SUFDdkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztRQUMzQyxJQUFJLFVBQVUsR0FBVSxFQUFFLENBQUM7UUFFM0IscUJBQXFCO1FBQ3JCLElBQUksS0FBSyxHQUFHLGtCQUFrQixDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUzQyxtQ0FBbUM7UUFDbkMs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