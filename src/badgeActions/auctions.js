"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFlopWinsCountForAddress = exports.checkFlopBidsCountForAddress = exports.checkFlapWinsCountForAddress = exports.checkFlapBidsCountForAddress = exports.checkFlipWinsCountForAddress = exports.checkFlipBidsCountForAddress = void 0;
const auctions_1 = require("../apollo/queries/auctions");
const clients_1 = require("../apollo/clients");
async function checkFlipBidsCountForAddress(address, count) {
    const result = await clients_1.makerClient.query({
        query: auctions_1.ALL_FLIP_BIDS_QUERY,
        fetchPolicy: "cache-first",
    });
    const bids = result.data.allFlipBidEvents.nodes
        .map((bid) => {
        if (bid.tx.nodes.txFrom === address) {
            return 1;
        }
        else {
            return null;
        }
    })
        .filter((el) => {
        el !== null;
    });
    if (bids.length >= count) {
        return 1;
    }
    else {
        return 0;
    }
}
exports.checkFlipBidsCountForAddress = checkFlipBidsCountForAddress;
function checkFlipWinsCountForAddress(address, count) {
    return 1;
}
exports.checkFlipWinsCountForAddress = checkFlipWinsCountForAddress;
function checkFlapBidsCountForAddress(address, count) {
    return 1;
}
exports.checkFlapBidsCountForAddress = checkFlapBidsCountForAddress;
function checkFlapWinsCountForAddress(address, count) {
    return 1;
}
exports.checkFlapWinsCountForAddress = checkFlapWinsCountForAddress;
function checkFlopBidsCountForAddress(address, count) {
    return 1;
}
exports.checkFlopBidsCountForAddress = checkFlopBidsCountForAddress;
function checkFlopWinsCountForAddress(address, count) {
    return 1;
}
exports.checkFlopWinsCountForAddress = checkFlopWinsCountForAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5REFBaUU7QUFDakUsK0NBQWdEO0FBRXpDLEtBQUssVUFBVSw0QkFBNEIsQ0FDaEQsT0FBZSxFQUNmLEtBQWE7SUFFYixNQUFNLE1BQU0sR0FBRyxNQUFNLHFCQUFXLENBQUMsS0FBSyxDQUFDO1FBQ3JDLEtBQUssRUFBRSw4QkFBbUI7UUFDMUIsV0FBVyxFQUFFLGFBQWE7S0FDM0IsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1NBQzVDLEdBQUcsQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1FBQ2hCLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtZQUNuQyxPQUFPLENBQUMsQ0FBQztTQUNWO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQyxDQUFDO1NBQ0QsTUFBTSxDQUFDLENBQUMsRUFBTyxFQUFFLEVBQUU7UUFDbEIsRUFBRSxLQUFLLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ0wsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssRUFBRTtRQUN4QixPQUFPLENBQUMsQ0FBQztLQUNWO1NBQU07UUFDTCxPQUFPLENBQUMsQ0FBQztLQUNWO0FBQ0gsQ0FBQztBQXhCRCxvRUF3QkM7QUFFRCxTQUFnQiw0QkFBNEIsQ0FBQyxPQUFlLEVBQUUsS0FBYTtJQUN6RSxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUM7QUFGRCxvRUFFQztBQUVELFNBQWdCLDRCQUE0QixDQUFDLE9BQWUsRUFBRSxLQUFhO0lBQ3pFLE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUZELG9FQUVDO0FBRUQsU0FBZ0IsNEJBQTRCLENBQUMsT0FBZSxFQUFFLEtBQWE7SUFDekUsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRkQsb0VBRUM7QUFFRCxTQUFnQiw0QkFBNEIsQ0FBQyxPQUFlLEVBQUUsS0FBYTtJQUN6RSxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUM7QUFGRCxvRUFFQztBQUVELFNBQWdCLDRCQUE0QixDQUFDLE9BQWUsRUFBRSxLQUFhO0lBQ3pFLE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUZELG9FQUVDIn0=