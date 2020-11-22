"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBadgesForAddress = void 0;
const utils_1 = require("./utils");
const dai_1 = require("./apollo/queries/dai");
const clients_1 = require("./apollo/clients");
const aws_1 = require("./utils/aws");
const merkleTree_1 = require("./utils/merkleTree");
// HARDER TO TRACK IDEAS
//  Propose a new Maker project
//  Contribute to an existing project/bounty
//  Get a development grant
//  Translate content
//  Apply to be a translator
//  Apply to be a translator reviewer
//  Create new content for comm-dev
//  Edit existing content
//  Improve Maker knowledge
//  E.g. learn about vaults, voting, governance etc.
//  Get resources for working with Maker
//  E.g. writing style guide, visual style guide, assets
//  Join a governance meeting
//  Take notes at a meeting
//  Get Maker to take part in Hackathon (sponsorship/mentorship)
const badgeList = {
    MKR1: {
        id: 1,
        parent: 0,
        tier: 1,
        name: "Accrue 1 Dai from DSR",
        longName: "Accrue 1 Dai from the Dai Savings Rate",
        description: "Accruing Dai in the Dai Savings Rate is a great way to earn while maintaining the value of your holdings. You can start accumulating with Dai from an exchange. Accrue 1 Dai by locking Dai in Oasis Save to unlock this achievement.",
        resource: "https://oasis.app/save",
        steps: {
            1: "Head over to Oasis Save and unlock your Web3 wallet",
            2: "Select Deposit and enter an amount to deposit",
            3: "Sign the transaction and come back when you've accrued enough Dai from the DSR",
        },
        note: "",
        imgPath: "mkr_1_dai_locked_1.png",
    },
    MKR2: {
        id: 2,
        parent: 1,
        tier: 2,
        name: "Earn in DSR for 3 months",
        longName: "Lock 10 Dai from the Dai Savings Rate",
        description: "Accruing Dai in the Dai Savings Rate is a great way to earn while maintaining the value of your holdings. You can start accumulating with Dai from an exchange. Earn on 10 locked Dai in DSR for 3 months to unlock this achievement.",
        resource: "https://oasis.app/save",
        steps: {
            1: "Head over to Oasis Save and unlock your Web3 wallet",
            2: "Select Deposit and enter an amount to deposit (above 10)",
            3: "Sign the transaction and come back when you've locked enough Dai for long enough",
        },
        note: "",
        imgPath: "mkr_2_dai_locked_2.png",
    },
    MKR3: {
        id: 3,
        parent: 2,
        tier: 3,
        name: "Earn in DSR for 6 months",
        longName: "Earn on 10 locked Dai in DSR for 6 months",
        description: "Accruing Dai in the Dai Savings Rate is a great way to earn while maintaining the value of your holdings. You can start accumulating with Dai from an exchange. Earn on 10 locked Dai in DSR for 6 months to unlock this achievement.",
        resource: "https://oasis.app/save",
        steps: {
            1: "Head over to Oasis Save and unlock your Web3 wallet",
            2: "Select Deposit and enter an amount to deposit (above 10)",
            3: "Sign the transaction and come back when you've locked enough Dai for long enough",
        },
        note: "",
        imgPath: "mkr_3_dai_locked_3.png",
    },
    MKR4: {
        id: 4,
        parent: 0,
        tier: 1,
        name: "Send 10 Dai",
        longName: "Send 10 Dai",
        description: "Sending Dai is the backbone of the decentralized ecosystem. Send 10 Dai for gifts, rent, or returning the favor to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Head over to your Web3 wallet and unlock it",
            2: "Send at least 10 Dai to another address",
        },
        note: "",
        imgPath: "mkr_4_dai_sent_1.png",
    },
    MKR5: {
        id: 5,
        parent: 4,
        tier: 2,
        name: "Send 20 Dai",
        longName: "Send 20 Dai",
        description: "Sending Dai is the backbone of the decentralized ecosystem. Send 100 Dai for gifts, rent, or returning the favor to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Head over to your Web3 wallet and unlock it",
            2: "Send at least 100 Dai to another address",
        },
        note: "",
        imgPath: "mkr_5_dai_sent_2.png",
    },
    MKR6: {
        id: 6,
        parent: 0,
        tier: 1,
        name: "Vote on a Governance Poll",
        longName: "Vote on one Governance Poll",
        description: "Driving decision making through on-chain consensus is a determining aspect of scientific governance. On-chain polling is done to understand sentiment from token holders around actions taken for risk parameters. Vote on a Governance Poll to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Head over to the Governance portal",
            2: "Unlock your Web3 wallet",
            3: "Register a vote on a Governance Poll",
        },
        note: "",
        imgPath: "mkr_6_poll_1.png",
    },
    MKR7: {
        id: 7,
        parent: 6,
        tier: 2,
        name: "Vote on 5 Governance Polls",
        longName: "Vote on at least 5 Governance Polls",
        description: "Driving decision making through on-chain consensus is a determining aspect of scientific governance. On-chain polling is done to understand sentiment from token holders around actions taken for risk parameters. Vote on 5 Governance Polls to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Head over to the Governance portal",
            2: "Unlock your Web3 wallet",
            3: "Register a vote on 5 Governance Polls",
        },
        note: "",
        imgPath: "mkr_7_poll_2.png",
    },
    MKR8: {
        id: 8,
        parent: 7,
        tier: 3,
        name: "Vote on 10 Governance Polls",
        longName: "Vote on at least 10 Governance Polls",
        description: "Driving decision making through on-chain consensus is a determining aspect of scientific governance. On-chain polling is done to understand sentiment from token holders around actions taken for risk parameters. Vote on 10 Governance Polls to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Head over to the Governance portal",
            2: "Unlock your Web3 wallet",
            3: "Register a vote on 10 Governance Polls",
        },
        note: "",
        imgPath: "mkr_8_poll_3.png",
    },
    MKR9: {
        id: 9,
        parent: 8,
        tier: 4,
        name: "Vote on 20 Governance Polls",
        longName: "Vote on at least 20 Governance Polls",
        description: "Driving decision making through on-chain consensus is a determining aspect of scientific governance. On-chain polling is done to understand sentiment from token holders around actions taken for risk parameters. Vote on 20 Governance Polls to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Head over to the Governance portal",
            2: "Unlock your Web3 wallet",
            3: "Register a vote on 20 Governance Polls",
        },
        note: "",
        imgPath: "mkr_9_poll_4.png",
    },
    MKR10: {
        id: 10,
        parent: 9,
        tier: 5,
        name: "Vote on 50 Governance Polls",
        longName: "Vote on at least 50 Governance Polls",
        description: "Driving decision making through on-chain consensus is a determining aspect of scientific governance. On-chain polling is done to understand sentiment from token holders around actions taken for risk parameters. Vote on 50 Governance Polls to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Head over to the Governance portal",
            2: "Unlock your Web3 wallet",
            3: "Register a vote on 50 Governance Polls",
        },
        note: "",
        imgPath: "mkr_10_poll_5.png",
    },
    MKR11: {
        id: 11,
        parent: 10,
        tier: 6,
        name: "Vote on 100 Governance Polls",
        longName: "Vote on at least 100 Governance Polls",
        description: "Driving decision making through on-chain consensus is a determining aspect of scientific governance. On-chain polling is done to understand sentiment from token holders around actions taken for risk parameters. Vote on 100 Governance Polls to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Head over to the Governance portal",
            2: "Unlock your Web3 wallet",
            3: "Register a vote on 100 Governance Polls",
        },
        note: "",
        imgPath: "mkr_11_poll_6.png",
    },
    MKR12: {
        id: 12,
        parent: 6,
        tier: 1,
        name: "Vote on 2 consecutive Governance Polls",
        longName: "Vote on at least 2 consecutive Governance Polls",
        description: "Governance requires regular decisions to sufficiently govern. Consensus requires many voices to be heard. Vote on consecutive governance polls to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Since you've successfully voted in one Governance Poll, you can head over to the Governance portal to cast another vote.",
            2: "Register a vote in back-to-back Governance Polls",
        },
        note: "Polls are indexed by deploy timestamp but not necessarily ordered in the voting interface",
        imgPath: "mkr_12_consecutive_poll_1.png",
    },
    MKR13: {
        id: 13,
        parent: 12,
        tier: 2,
        name: "Vote on 5 consecutive Governance Polls",
        longName: "Vote on at least 5 consecutive Governance Polls",
        description: "Governance requires regular decisions to sufficiently govern. Consensus requires many voices to be heard. Vote on 5 consecutive governance polls to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Since you've successfully voted in one Governance Poll, you can head over to the Governance portal to cast another vote.",
            2: "Register a vote in 5 sequential Governance Polls",
        },
        note: "Polls are indexed by deploy timestamp but not necessarily ordered in the voting interface",
        imgPath: "mkr_13_consecutive_poll_2.png",
    },
    MKR14: {
        id: 14,
        parent: 13,
        tier: 3,
        name: "Vote on 10 consecutive Governance Polls",
        longName: "Vote on at least 10 consecutive Governance Polls",
        description: "Governance requires regular decisions to sufficiently govern. Consensus requires many voices to be heard. Vote on 10 consecutive governance polls to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Since you've successfully voted in one Governance Poll, you can head over to the Governance portal to cast another vote.",
            2: "Register a vote in 10 consecutive Governance Polls",
        },
        note: "Polls are indexed by deploy timestamp but not necessarily ordered in the voting interface",
        imgPath: "mkr_14_consecutive_poll_3.png",
    },
    MKR15: {
        id: 15,
        parent: 0,
        tier: 1,
        name: "Vote on an Executive Proposal",
        longName: "Vote on one Executive Vote<br>to enact a new Proposal",
        description: "Using Continuous Approval Voting, governance is able to implement progressive changes while protecting the system from unintended changes. Vote on an Executive Proposal to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Head over to the Governance Portal",
            2: "Unlock your Web3 wallet and set up a voting proxy",
            3: "Cast a vote on one Executive Proposal",
        },
        note: "",
        imgPath: "mkr_15_spell_1.png",
    },
    MKR16: {
        id: 16,
        parent: 15,
        tier: 2,
        name: "Vote on 5 Executive Proposals",
        longName: "Vote on five Executive Votes<br>to upgrade the Maker System",
        description: "Using Continuous Approval Voting, governance is able to implement progressive changes while protecting the system from unintended changes. Vote on 5 Executive Proposals to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Head over to the Governance Portal",
            2: "Unlock your Web3 wallet and set up a voting proxy",
            3: "Cast a vote on five Executive Proposals",
        },
        note: "",
        imgPath: "mkr_16_spell_2.png",
    },
    MKR17: {
        id: 17,
        parent: 16,
        tier: 3,
        name: "Vote on 10 Executive Proposals",
        longName: "Vote on ten Executive Votes<br>to upgrade the Maker System",
        description: "Using Continuous Approval Voting, governance is able to implement progressive changes while protecting the system from unintended changes. Vote on 10 Executive Proposals to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Head over to the Governance Portal",
            2: "Unlock your Web3 wallet and set up a voting proxy",
            3: "Cast a vote on ten Executive Proposals",
        },
        note: "",
        imgPath: "mkr_17_spell_3.png",
    },
    MKR18: {
        id: 18,
        parent: 17,
        tier: 4,
        name: "Vote on 20 Executive Proposals",
        longName: "Vote on twenty Executive Vote<br>to upgrade the Maker System",
        description: "Using Continuous Approval Voting, governance is able to implement progressive changes while protecting the system from unintended changes. Vote on 20 Executive Proposals to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Head over to the Governance Portal",
            2: "Unlock your Web3 wallet and set up a voting proxy",
            3: "Cast a vote on twenty Executive Proposals",
        },
        note: "",
        imgPath: "mkr_18_spell_4.png",
    },
    MKR19: {
        id: 19,
        parent: 18,
        tier: 5,
        name: "Vote on 50 Executive Proposals",
        longName: "Vote on fifty Executive Vote<br>to upgrade the Maker System",
        description: "Using Continuous Approval Voting, governance is able to implement progressive changes while protecting the system from unintended changes. Vote on 50 Executive Proposals to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Head over to the Governance Portal",
            2: "Unlock your Web3 wallet and set up a voting proxy",
            3: "Cast a vote on 50 Executive Proposals",
        },
        note: "",
        imgPath: "mkr_19_spell_5.png",
    },
    MKR20: {
        id: 20,
        parent: 15,
        tier: 1,
        name: "First Executive Voter",
        longName: "Be one of the first voters on<br>a new Executive Proposal",
        description: "Vote on an Executive Proposal within an hour of its creation to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Head over to the Governance Portal",
            2: "Unlock your Web3 wallet and set up a voting proxy",
            3: "Cast a vote on an Executive Proposal in the first hour after it has been deployed on chain",
        },
        note: "",
        imgPath: "mkr_20_early_spell_1.png",
    },
    MKR21: {
        id: 21,
        parent: 6,
        tier: 1,
        name: "First Governance Poller",
        longName: "Be one of the first voters on<br>a new Governance Poll",
        description: "Vote on a Governance Poll within an hour of its creation to unlock this achievement.",
        resource: "https://vote.makerdao.com",
        steps: {
            1: "Head over to the Governance Portal",
            2: "Unlock your Web3 wallet",
            3: "Register a vote on a Governance Poll in the first hour after it's start time",
        },
        note: "Governance Polls have specified start times rather than being available when deployed",
        imgPath: "mkr_21_early_poll_1.png",
    },
    MKR22: {
        id: 22,
        parent: 0,
        tier: 1,
        name: "Bite an unsafe Vault",
        longName: "Bite an unsafe Vault",
        description: "In order to keep Dai stable MKR holders need to ensure collateral can be swiftly swapped to repay Dai debt. Help maintain the system by biting a vault that is below the required collateralization ratio to unlock this achievement.",
        resource: "https://app.keeperdao.com",
        steps: {
            1: "KeeperDAO.com and Atomica.org are running pooled keepers",
            2: "Alternatively run your own keeper bot, though this route is more advanced.",
            3: "Once you've chosen one of these options keep an eye out (probably automatically) for unsafe vaults and call the bite() function to trigger the collateral auction",
        },
        note: "",
        imgPath: "mkr_22_bite_1.png",
    },
    MKR23: {
        id: 23,
        parent: 22,
        tier: 2,
        name: "Bite 10 unsafe Vaults",
        longName: "Bite at least 10 unsafe Vaults",
        description: "In order to keep Dai stable MKR holders need to ensure collateral can be swiftly swapped to repay Dai debt. Help maintain the system by biting 10 vaults that are below the required collateralization ratio to unlock this achievement.",
        resource: "https://app.keeperdao.com",
        steps: {
            1: "KeeperDAO.com and Atomica.org are running pooled keepers",
            2: "Alternatively run your own keeper bot, though this route is more advanced.",
            3: "Once you've chosen one of these options keep an eye out (probably automatically) for unsafe vaults and call the bite() function to trigger the collateral auction for 10 unsafe vaults",
        },
        note: "",
        imgPath: "mkr_23_bite_2.png",
    },
    MKR24: {
        id: 24,
        parent: 23,
        tier: 3,
        name: "Bite 50 unsafe Vaults",
        longName: "Bite at least fifty unsafe Vaults",
        description: "In order to keep Dai stable MKR holders need to ensure collateral can be swiftly swapped to repay Dai debt. Help maintain the system by biting 50 vaults that are below the required collateralization ratio to unlock this achievement.",
        resource: "https://app.keeperdao.com",
        steps: {
            1: "KeeperDAO.com and Atomica.org are running pooled keepers",
            2: "Alternatively run your own keeper bot, though this route is more advanced.",
            3: "Once you've chosen one of these options keep an eye out (probably automatically) for unsafe vaults and call the bite() function to trigger the collateral auction for 50 unsafe vaults",
        },
        note: "",
        imgPath: "mkr_24_bite_3.png",
    },
    MKR25: {
        id: 25,
        parent: 24,
        tier: 4,
        name: "Bite 100 unsafe Vault",
        longName: "Bite at least 100 unsafe Vaults",
        description: "In order to keep Dai stable MKR holders need to ensure collateral can be swiftly swapped to repay Dai debt. Help maintain the system by biting 100 vaults that are below the required collateralization ratio to unlock this achievement.",
        resource: "https://app.keeperdao.com",
        steps: {
            1: "KeeperDAO.com and Atomica.org are running pooled keepers",
            2: "Alternatively run your own keeper bot, though this route is more advanced.",
            3: "Once you've chosen one of these options keep an eye out (probably automatically) for unsafe vaults and call the bite() function to trigger the collateral auction for 100 unsafe vaults",
        },
        note: "",
        imgPath: "mkr_25_bite_4.png",
    },
    MKR26: {
        id: 26,
        parent: 0,
        tier: 1,
        name: "Bid on a Collateral Auction",
        longName: "Bid on a Collateral Auction",
        description: "Once unsafe vaults are bitten the collateral is swapped for Dai to pay back the outstanding debt. Help the system and keep stable bids on collateral. Bid on a collateral auction from a liquidated vault to unlock this achievement.",
        resource: "https://defiexplore.com/liquidations",
        steps: {
            1: "Head over to an auctions portal (Dai Auctions/Defi Explore)",
            2: "Connect your Web3 wallet",
            3: "Place a bid on a collateral auction",
        },
        note: "Includes Tend and Dent bids",
        imgPath: "mkr_26_flip_bid_1.png",
    },
    MKR27: {
        id: 27,
        parent: 26,
        tier: 2,
        name: "Bid on 5 Collateral Auctions",
        longName: "Bid on 5 Collateral Auction",
        description: "Once unsafe vaults are bitten the collateral is swapped for Dai to pay back the outstanding debt. Help the system and keep stable bids on collateral. Bid on 5 collateral auctions from liquidated vaults to unlock this achievement.",
        resource: "https://defiexplore.com/liquidations",
        steps: {
            1: "Head over to an auctions portal (Dai Auctions/Defi Explore)",
            2: "Connect your Web3 wallet",
            3: "Place a bid on 5 collateral auctions",
        },
        note: "Includes Tend and Dent bids",
        imgPath: "mkr_27_flip_bid_2.png",
    },
    MKR28: {
        id: 28,
        parent: 27,
        tier: 3,
        name: "Bid on 10 Collateral Auctions",
        longName: "Bid on 10 Collateral Auctions",
        description: "Once unsafe vaults are bitten the collateral is swapped for Dai to pay back the outstanding debt. Help the system and keep stable bids on collateral. Bid on 10 collateral auctions from liquidated vaults to unlock this achievement.",
        resource: "https://defiexplore.com/liquidations",
        steps: {
            1: "Head over to an auctions portal (Dai Auctions/Defi Explore)",
            2: "Connect your Web3 wallet",
            3: "Place a bid on 10 collateral auctions",
        },
        note: "Includes Tend and Dent bids",
        imgPath: "mkr_28_flip_bid_3.png",
    },
    MKR29: {
        id: 29,
        parent: 28,
        tier: 4,
        name: "Bid on 25 Collateral Auctions",
        longName: "Bid on 25 Collateral Auctions",
        description: "Once unsafe vaults are bitten the collateral is swapped for Dai to pay back the outstanding debt. Help the system and keep stable bids on collateral. Bid on 25 collateral auctions from liquidated vaults to unlock this achievement.",
        resource: "https://defiexplore.com/liquidations",
        steps: {
            1: "Head over to an auctions portal (Dai Auctions/Defi Explore)",
            2: "Connect your Web3 wallet",
            3: "Place a bid on 25 collateral auctions",
        },
        note: "Includes Tend and Dent bids",
        imgPath: "mkr_29_flip_bid_4.png",
    },
    MKR30: {
        id: 30,
        parent: 26,
        tier: 1,
        name: "Won a Collateral Auction",
        longName: "Won a Collateral Auction",
        description: "Be the winner of a collateral auction from a liquidated vault to unlock this achievement.",
        resource: "https://defiexplore.com/liquidations",
        steps: {
            1: "Head over to an auctions portal (Dai Auctions/Defi Explore)",
            2: "Connect your Web3 wallet",
            3: "Call the Deal() function to complete an auction and finalize the collateral and Dai swap",
        },
        note: "",
        imgPath: "mkr_30_flip_win_1.png",
    },
    MKR31: {
        id: 31,
        parent: 30,
        tier: 2,
        name: "Won 5 Collateral Auctions",
        longName: "Won 5 Collateral Auctions",
        description: "Be the winner of 5 collateral auctions from liquidated vaults to unlock this achievement.",
        resource: "https://defiexplore.com/liquidations",
        steps: {
            1: "Head over to an auctions portal (Dai Auctions/Defi Explore)",
            2: "Connect your Web3 wallet",
            3: "Call the Deal() function to complete 5 auctions and finalize the collateral and Dai swaps",
        },
        note: "",
        imgPath: "mkr_31_flip_win_2.png",
    },
    MKR32: {
        id: 32,
        parent: 31,
        tier: 3,
        name: "Won 10 Collateral Auctions",
        longName: "Won 10 Collateral Auctions",
        description: "Be the winner of 10 collateral auctions from liquidated vaults to unlock this achievement.",
        resource: "https://defiexplore.com/liquidations",
        steps: {
            1: "Head over to an auctions portal (Dai Auctions/Defi Explore)",
            2: "Connect your Web3 wallet",
            3: "Call the Deal() function to complete 10 auctions and finalize the collateral and Dai swaps",
        },
        note: "",
        imgPath: "mkr_32_flip_win_3.png",
    },
    MKR33: {
        id: 33,
        parent: 32,
        tier: 4,
        name: "Won 25 Collateral Auctions",
        longName: "Won 25 Collateral Auctions",
        description: "Be the winner of 25 collateral auctions from liquidated vaults to unlock this achievement.",
        resource: "https://defiexplore.com/liquidations",
        steps: {
            1: "Head over to an auctions portal (Dai Auctions/Defi Explore)",
            2: "Connect your Web3 wallet",
            3: "Call the Deal() function to complete 25 auctions and finalize the collateral and Dai swaps",
        },
        note: "",
        imgPath: "mkr_33_flip_win_4.png",
    },
};
// MKR6: {
//   id: 6,
//   parent: 0,
//   tier: 1,
//   name: "Join the PoolTogether savings game",
//   longName: "Join the PoolTogther savings game",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   progress: 0,
//   proof: [],
//   root: "",
// },
// MKR7: {
//   id: 7,
//   parent: 0,
//   tier: 1,
//   name: "Lend Dai on Compound",
//   longName: "Lend Dai on Compound",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   progress: 0,
//   proof: [],
//   root: "",
// },
// *** SET PARENT AND TIER *** //
// MKR36: {
//   id: 36,
//   name: "Bid on a Surplus Auction",
//   longName: "Bid on a Surplus Auction",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR37: {
//   id: 37,
//   name: "Bid on 5 Surplus Auctions",
//   longName: "Bid on 5 Surplus Auction",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR38: {
//   id: 38,
//   name: "Bid on 10 Surplus Auctions",
//   longName: "Bid on 10 Surplus Auctions",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR39: {
//   id: 39,
//   name: "Bid on 25 Surplus Auctions",
//   longName: "Bid on 25 Surplus Auctions",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR40: {
//   id: 40,
//   name: "Won a Surplus Auction",
//   longName: "Won a Surplus Auction",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR41: {
//   id: 41,
//   name: "Won 5 Surplus Auctions",
//   longName: "Won 5 Surplus Auctions",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR42: {
//   id: 42,
//   name: "Won 10 Surplus Auctions",
//   longName: "Won 10 Surplus Auctions",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR43: {
//   id: 43,
//   name: "Won 25 Surplus Auctions",
//   longName: "Won 25 Surplus Auctions",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR44: {
//   id: 44,
//   name: "Bid on a Debt Auction",
//   longName: "Bid on a Debt Auction",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR45: {
//   id: 45,
//   name: "Bid on 5 Debt Auctions",
//   longName: "Bid on 5 Debt Auction",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR46: {
//   id: 46,
//   name: "Bid on 10 Debt Auctions",
//   longName: "Bid on 10 Debt Auctions",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR47: {
//   id: 47,
//   name: "Bid on 25 Debt Auctions",
//   longName: "Bid on 25 Debt Auctions",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR48: {
//   id: 48,
//   name: "Won a Debt Auction",
//   longName: "Won a Debt Auction",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR49: {
//   id: 49,
//   name: "Won 5 Debt Auctions",
//   longName: "Won 5 Debt Auctions",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR50: {
//   id: 50,
//   name: "Won 10 Debt Auctions",
//   longName: "Won 10 Debt Auctions",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR51: {
//   id: 51,
//   name: "Won 25 Debt Auctions",
//   longName: "Won 25 Debt Auctions",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "quick-vote-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR52: {
//   id: 52,
//   name: "MKR in Voting Contract for 3 months",
//   longName: "Secure MKR Governance with your<br>MKR for at least 3 months",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "lock-mkr-x3-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR53: {
//   id: 53,
//   name: "MKR in Voting Contract for 6 months",
//   longName: "Secure MKR Governance with your<br>MKR for at least 6 months",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "lock-mkr-x3-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR54: {
//   id: 54,
//   name: "MKR in Voting Contract for 12 months",
//   longName: "Secure MKR Governance with your<br>MKR for at least 12 months",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "lock-mkr-x12-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR55: {
//   id: 55,
//   name: "Enact a Proposal",
//   longName: "Cast the Spell to enact the<br>proposal contained in the Spell",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://etherscan.io",
//   imgPath: "cast-spell-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR56: {
//   id: 56,
//   name: "Create a Proposal that gets 10 votes",
//   longName:
//     "Create an Executive Proposal that<br>accumulates at least 10 voters",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "spell-10-votes-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR57: {
//   id: 57,
//   name: "Create a Proposal that is passed",
//   longName:
//     "Create an Executive Proposal<br>that is passed by MKR Governance",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "spell-is-cast-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR58: {
//   id: 58,
//   name: "Create 5 Proposals that pass",
//   longName:
//     "Create an Executive Proposal<br>that is passed by MKR Governance",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "spell-is-cast-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR59: {
//   id: 59,
//   name: "Create 10 Proposals that pass",
//   longName:
//     "Create an Executive Proposal<br>that is passed by MKR Governance",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "spell-is-cast-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR60: {
//   id: 60,
//   name: "Create a Governance Poll",
//   longName:
//     "Create a Governance Poll to<br />establish MKR governance sentiment",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "spell-is-cast-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR61: {
//   id: 61,
//   name: "Create 5 Governance Polls",
//   longName:
//     "Create 5 Governance Polls to<br />establish MKR governance sentiment",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "spell-is-cast-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR62: {
//   id: 62,
//   name: "Create 10 Governance Polls",
//   longName:
//     "Create 10 Governance Polls to<br />establish MKR governance sentiment",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "spell-is-cast-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// MKR63: {
//   id: 63,
//   name: "Create 25 Governance Polls",
//   longName:
//     "Create 25 Governance Polls to<br />establish MKR governance sentiment",
//   description:
//     "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   resource: "https://vote.makerdao.com",
//   imgPath: "spell-is-cast-badge.svg",
//   unlocked: 0,
//   redeemed: 0,
//   proof: "",
// },
// };
// const limited_badges = {
//   LMKR1: {
//     name: "Casted SCD Shutdown Spell",
//     longName: "Cast SCD Shutdown Spell",
//     description:
//       "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//     resource: "https://vote.makerdao.com",
//     imgPath: "spell-is-cast-badge.svg",
//     unlocked: 0,
//     redeemed: 0,
//   },
//   LMKR2: {
//     name: "Casted MCD Launch Spell",
//     longName: "Cast MCD Launch Spell",
//     description:
//       "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//     resource: "https://vote.makerdao.com",
//     imgPath: "spell-is-cast-badge.svg",
//     unlocked: 0,
//     redeemed: 0,
//   },
// };
async function getBadgesForAddress(_address) {
    const addressList = await utils_1.checkForProxyAddresses(_address);
    return Promise.all(Object.keys(badgeList).map(async (key) => {
        let badge = badgeList[key];
        badge = Object.assign(Object.assign({}, badge), { progress: 0, unlocked: 0, verified: 0, redeemed: 0, completedAddress: "0x", proof: [], root: "" });
        // WORKAROUND FOR FORUM ROLL OUT
        // if (key === 'MKR1') {
        //   console.log('test')
        // }
        // 4. Send 10 Dai, 5.
        if (key === "MKR4") {
            const result = await clients_1.daiClient.query({
                query: dai_1.USER_DAI_TRANSFERS_QUERY,
                fetchPolicy: "cache-first",
                variables: {
                    address: _address.toLowerCase(),
                },
            });
            let sent = 0;
            if (result.data && result.data.transfers.length > 0) {
                for (let i = 0; i < result.data.transfers.length; i++) {
                    sent = sent + parseInt(result.data.transfers[i]["wad"]);
                    if (sent > 11) {
                        break;
                    }
                }
            }
            if (sent > 10) {
                badge.unlocked = 1;
                badge.completedAddress = _address;
            }
        }
        else if (key === "MKR5") {
            const result = await clients_1.daiClient.query({
                query: dai_1.USER_DAI_TRANSFERS_QUERY,
                fetchPolicy: "cache-first",
                variables: {
                    address: _address.toLowerCase(),
                },
            });
            let sent = 0;
            if (result.data && result.data.transfers.length > 0) {
                for (let i = 0; i < result.data.transfers.length; i++) {
                    sent = sent + parseInt(result.data.transfers[i]["wad"]);
                    if (sent > 101) {
                        break;
                    }
                }
            }
            if (sent > 100) {
                badge.unlocked = 1;
                badge.completedAddress = _address;
            }
        }
        else {
            // STANDARD IMPLEMENTATION
            let template = await aws_1.getTemplate(parseFloat(key.slice(3, key.length)));
            // if (template.progress != {}) {
            //   // if (template.progress[_address]) {
            //   //   badge.progress = template.progress[_address];
            //   // }
            //   badge.progress = await checkTemplateProgressForAddressList(
            //     addressList,
            //     template.progress,
            //   );
            // }
            if (template.addresses.length > 0) {
                let tree = new merkleTree_1.default(template.addresses);
                badge.root = tree.getHexRoot();
                badge.completedAddress = await utils_1.checkTemplateAddressesForAddressList(addressList, template.addresses);
                if (badge.completedAddress !== "0x") {
                    badge.unlocked = 1;
                }
                if (badge.unlocked && !badge.redeemed) {
                    badge.proof = tree.getHexProof(badge.completedAddress);
                }
            }
        }
        return badge;
    }));
}
exports.getBadgesForAddress = getBadgesForAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFkZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUlpQjtBQUNqQiw4Q0FBZ0U7QUFDaEUsOENBQTZDO0FBQzdDLHFDQUEwQztBQUMxQyxtREFBNEM7QUFFNUMsd0JBQXdCO0FBRXhCLCtCQUErQjtBQUMvQiw0Q0FBNEM7QUFDNUMsMkJBQTJCO0FBQzNCLHFCQUFxQjtBQUNyQiw0QkFBNEI7QUFDNUIscUNBQXFDO0FBQ3JDLG1DQUFtQztBQUNuQyx5QkFBeUI7QUFDekIsMkJBQTJCO0FBQzNCLG9EQUFvRDtBQUNwRCx3Q0FBd0M7QUFDeEMsd0RBQXdEO0FBQ3hELDZCQUE2QjtBQUM3QiwyQkFBMkI7QUFDM0IsZ0VBQWdFO0FBRWhFLE1BQU0sU0FBUyxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNKLEVBQUUsRUFBRSxDQUFDO1FBQ0wsTUFBTSxFQUFFLENBQUM7UUFDVCxJQUFJLEVBQUUsQ0FBQztRQUNQLElBQUksRUFBRSx1QkFBdUI7UUFDN0IsUUFBUSxFQUFFLHdDQUF3QztRQUNsRCxXQUFXLEVBQ1QsdU9BQXVPO1FBQ3pPLFFBQVEsRUFBRSx3QkFBd0I7UUFDbEMsS0FBSyxFQUFFO1lBQ0wsQ0FBQyxFQUFFLHFEQUFxRDtZQUN4RCxDQUFDLEVBQUUsK0NBQStDO1lBQ2xELENBQUMsRUFBRSxnRkFBZ0Y7U0FDcEY7UUFDRCxJQUFJLEVBQUUsRUFBRTtRQUNSLE9BQU8sRUFBRSx3QkFBd0I7S0FDbEM7SUFDRCxJQUFJLEVBQUU7UUFDSixFQUFFLEVBQUUsQ0FBQztRQUNMLE1BQU0sRUFBRSxDQUFDO1FBQ1QsSUFBSSxFQUFFLENBQUM7UUFDUCxJQUFJLEVBQUUsMEJBQTBCO1FBQ2hDLFFBQVEsRUFBRSx1Q0FBdUM7UUFDakQsV0FBVyxFQUNULHVPQUF1TztRQUN6TyxRQUFRLEVBQUUsd0JBQXdCO1FBQ2xDLEtBQUssRUFBRTtZQUNMLENBQUMsRUFBRSxxREFBcUQ7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