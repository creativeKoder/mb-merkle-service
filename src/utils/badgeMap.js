"use strict";
// MKR1 : discourse 103 "Accrue 1 Dai from DSR"
// MKR2 : discourse 104 "Earn in DSR for 3 months"
// MKR3 : discourse 105 "Earn in DSR for 6 months"
// MKR4 : discourse 106 "Send 10 Dai"
// MKR5 : discourse 107 "Send 20 Dai"
// MKR6 : discourse 108 "Vote on a Governance Poll"
// MKR7 : discourse 109 "Vote on 5 Governance Polls"
// MKR8 : discourse 110 "Vote on 10 Governance Polls"
// MKR9 : discourse 111 "Vote on 20 Governance Polls"
// MKR10 : discourse 112 "Vote on 50 Governance Polls"
// MKR11 : discourse 113 "Vote on 100 Governance Polls"
// MKR12 : discourse 114 "Vote on 2 consecutive Governance Polls"
// MKR13 : discourse 115 "Vote on 5 consecutive Governance Polls"
// MKR14 : discourse 116 "Vote on 10 consecutive Governance Polls"
// MKR15 : discourse 117 "Vote on an Executive Proposal"
// MKR16 : discourse 118 "Vote on 5 Executive Proposals"
// MKR17 : discourse 119 "Vote on 10 Executive Proposals"
// MKR18 : discourse 120 "Vote on 20 Executive Proposals"
// MKR19 : discourse 121 "Vote on 50 Executive Proposals"
// MKR20 : discourse 122 "First Executive Voter"
// MKR21 : discourse 123 "First Governance Poller"
// MKR22 : discourse 124 "Bite an Unsafe Vault"
// MKR23 : discourse 125 "Bite 10 unsafe Vaults"
// MKR24 : discourse 126 "Bite 50 unsafe Vaults"
// MKR25 : discourse 127 "Bite 100 unsafe Vaults"
// MKR26 : discourse 128 "Bid on a Collateral Auction"
// MKR27 : discourse 129 "Bid on 5 Collateral Auctions"
// MKR28 : discourse 130 "Bid on 10 Collateral Auctions"
// MKR29 : discourse 131 "Bid on 25 Collateral Auctions"
// MKR30 : discourse 132 "Won a Collateral Auction"
// MKR31 : discourse 133 "Won 5 Collateral Auctions"
// MKR32 : discourse 134 "Won 10 Collateral Auctions"
// MKR33 : discourse 135 "Won 25 Collateral Auctions"
Object.defineProperty(exports, "__esModule", { value: true });
exports.badgeMap = void 0;
exports.badgeMap = {
    1: 103,
    2: 104,
    3: 105,
    4: 106,
    5: 107,
    6: 108,
    7: 109,
    8: 110,
    9: 111,
    10: 112,
    11: 113,
    12: 114,
    13: 115,
    14: 116,
    15: 117,
    16: 118,
    17: 119,
    18: 120,
    19: 121,
    20: 122,
    21: 123,
    22: 124,
    23: 125,
    24: 126,
    25: 127,
    26: 128,
    27: 129,
    28: 130,
    29: 131,
    30: 132,
    31: 133,
    32: 134,
    33: 135,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2VNYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWRnZU1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQStDO0FBQy9DLGtEQUFrRDtBQUNsRCxrREFBa0Q7QUFDbEQscUNBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQyxtREFBbUQ7QUFDbkQsb0RBQW9EO0FBQ3BELHFEQUFxRDtBQUNyRCxxREFBcUQ7QUFDckQsc0RBQXNEO0FBQ3RELHVEQUF1RDtBQUN2RCxpRUFBaUU7QUFDakUsaUVBQWlFO0FBQ2pFLGtFQUFrRTtBQUNsRSx3REFBd0Q7QUFDeEQsd0RBQXdEO0FBQ3hELHlEQUF5RDtBQUN6RCx5REFBeUQ7QUFDekQseURBQXlEO0FBQ3pELGdEQUFnRDtBQUNoRCxrREFBa0Q7QUFDbEQsK0NBQStDO0FBQy9DLGdEQUFnRDtBQUNoRCxnREFBZ0Q7QUFDaEQsaURBQWlEO0FBQ2pELHNEQUFzRDtBQUN0RCx1REFBdUQ7QUFDdkQsd0RBQXdEO0FBQ3hELHdEQUF3RDtBQUN4RCxtREFBbUQ7QUFDbkQsb0RBQW9EO0FBQ3BELHFEQUFxRDtBQUNyRCxxREFBcUQ7OztBQUV4QyxRQUFBLFFBQVEsR0FBRztJQUN0QixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7Q0FDUixDQUFDIn0=