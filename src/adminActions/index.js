"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoots = void 0;
const _ = require("lodash");
// import { addOrUpdateTemplateRecord } from "../utils/aws";
// import {
//   allGovernancePollAddresses,
//   pollVoteAddressesForFrequency,
//   allExecutiveSpellAddresses,
//   spellVoteAddressesForFrequency,
//   allGovernancePollAddressesWithPollId,
//   consecutivePollVoteAddressesForFrequency,
//   allExecutiveSpellAddressesWithTimestamps,
//   earlyExecutiveVoteAddressesForTime,
//   allGovernancePollAddressesWithTimestamps,
//   earlyPollVoteAddressesForTime,
// } from "./governance";
const auctions_1 = require("./auctions");
const constants_1 = require("../constants");
const merkleTree_1 = require("../utils/merkleTree");
async function updateRoots() {
    // saving at least 1 dai in DSR
    console.log({ templateId: 1, dai_saved: 1 });
    // locking Dai in DSR for N (time) periods
    const daiInDsr = [
        { templateId: 2, periods: 3 },
        { templateId: 3, periods: 6 },
    ];
    daiInDsr.map(async (periods) => {
        console.log(periods);
    });
    // transfer N (amount) of Dai
    const daiTransferred = [
        { templateId: 4, amount: 10 },
        { templateId: 5, amount: 100 },
    ];
    daiTransferred.map(async (amount) => {
        console.log(amount);
    });
    // voting on at least N (frequency) governance polls
    // const governanceVoteFrequencies = [
    //   { templateId: 6, frequency: 1 },
    //   { templateId: 7, frequency: 5 },
    //   { templateId: 8, frequency: 10 },
    //   { templateId: 9, frequency: 20 },
    //   { templateId: 10, frequency: 50 },
    //   { templateId: 11, frequency: 100 },
    // ];
    // const govVoteAddresses = await allGovernancePollAddresses();
    // governanceVoteFrequencies.map(freq => {
    //   const govVoteAddressList = pollVoteAddressesForFrequency(freq.frequency, govVoteAddresses);
    //   if (govVoteAddressList.addresses && govVoteAddressList.addresses.length > 0) {
    //     const tree = new MerkleTree(govVoteAddressList.addresses);
    //     if (process.env.ENVIRONMENT === "production") {
    //       // addOrUpdateTemplateRecord(
    //       //   freq.templateId,
    //       //   govVoteAddressList.addresses,
    //       //   tree.getHexRoot(),
    //       //   govVoteAddressList.progress,
    //       // );
    //     } else {
    //       console.log(
    //         tree.getHexRoot() || ZERO_ROOT,
    //       );
    //     }
    //   } else {
    //     console.log('No Addresses for template #' + freq.templateId);
    //   }
    //   return;
    // });
    // voting on N (frequency) consecutive governance polls
    // const consecutiveGovernancePollFrequencies = [
    //   { templateId: 12, frequency: 2 },
    //   { templateId: 13, frequency: 5 },
    //   { templateId: 14, frequency: 10 },
    // ];
    // const governancePollAddresses = await allGovernancePollAddressesWithPollId();
    // consecutiveGovernancePollFrequencies.map(freq => {
    //   const consecutiveAddresses = consecutivePollVoteAddressesForFrequency(freq.frequency, governancePollAddresses);
    //   if (consecutiveAddresses.addresses && consecutiveAddresses.addresses.length > 0) {
    //     const tree = new MerkleTree(consecutiveAddresses.addresses);
    //     if (process.env.ENVIRONMENT === "production") {
    //       // addOrUpdateTemplateRecord(
    //       //   freq.templateId,
    //       //   consecutiveAddresses.addresses,
    //       //   tree.getHexRoot(),
    //       //   consecutiveAddresses.progress,
    //       // );
    //     }
    //     console.log(
    //       tree.getHexRoot() || ZERO_ROOT,
    //     );
    //   } else {
    //     console.log('No Addresses for template #' + freq.templateId)
    //   }
    //   return;
    // });
    // voting on at least N (frequency) executive proposals (spells)
    // const executiveSpellFrequencies = [
    //   { templateId: 15, frequency: 1 },
    //   { templateId: 16, frequency: 5 },
    //   { templateId: 17, frequency: 10 },
    //   { templateId: 18, frequency: 20 },
    //   { templateId: 19, frequency: 50 },
    // ];
    // const execSpellAddresses = await allExecutiveSpellAddresses();
    // executiveSpellFrequencies.map(freq => {
    //   const execAddresses = spellVoteAddressesForFrequency(freq.frequency, execSpellAddresses);
    //   if (execAddresses.addresses && execAddresses.addresses.length > 0) {
    //     const tree = new MerkleTree(execAddresses.addresses);
    //     if (process.env.ENVIRONMENT === "production") {
    //       // addOrUpdateTemplateRecord(
    //       //   freq.templateId,
    //       //   execAddresses.addresses || [],
    //       //   tree.getHexRoot() || ZERO_ROOT,
    //       //   execAddresses.progress || {},
    //       // );
    //     }
    //     console.log(
    //       tree.getHexRoot() || ZERO_ROOT,
    //     );
    //   } else {
    //     console.log('No Addresses for template #' + freq.templateId);
    //   }
    //   return;
    // });
    // early voter on Executive Spell (within 60 minutes of creation)
    // const earlyExecutiveVotes = [{ templateId: 20, time: 3600 }];
    // const executiveAddressesWithTimestamp = await allExecutiveSpellAddressesWithTimestamps()
    // earlyExecutiveVotes.map(time => {
    //   const earlyExecutiveAddresses = earlyExecutiveVoteAddressesForTime(time.time, executiveAddressesWithTimestamp);
    //   if (earlyExecutiveAddresses.addresses && earlyExecutiveAddresses.addresses.length > 0) {
    //     const tree = new MerkleTree(earlyExecutiveAddresses.addresses);
    //     if (process.env.ENVIRONMENT === "production") {
    //       // addOrUpdateTemplateRecord(
    //       //   time.templateId,
    //       //   earlyExecutiveAddresses.addresses || [],
    //       //   tree.getHexRoot() || ZERO_ROOT,
    //       //   earlyExecutiveAddresses.progress || {},
    //       // );
    //     }
    //     console.log(
    //       tree.getHexRoot() || ZERO_ROOT,
    //     );
    //   } else {
    //     console.log('No Addresses for template #' + freq.templateId)
    //   }
    //   return;
    // });
    // early voter on governance poll (within 60 minutes of start time)
    // const earlyPollVotes = [{ templateId: 21, time: 3600 }];
    // const govVoteAddressesWithTimestamp = await allGovernancePollAddressesWithTimestamps()
    // earlyPollVotes.map(time => {
    //   const addresses = earlyPollVoteAddressesForTime(time.time, govVoteAddressesWithTimestamp);
    //   if (addresses.addresses && addresses.addresses.length > 0) {
    //     const tree = new MerkleTree(addresses.addresses);
    //     if (process.env.ENVIRONMENT === "production") {
    //       // addOrUpdateTemplateRecord(
    //       //   time.templateId,
    //       //   addresses.addresses || [],
    //       //   tree.getHexRoot() || ZERO_ROOT,
    //       //   addresses.progress || {},
    //       // );
    //     }
    //     console.log(
    //       tree.getHexRoot() || ZERO_ROOT,
    //     );
    //   } else {
    //     console.log('No addresses for template #' + time.templateId);
    //   }
    //   return;
    // });
    // biting at least N (frequency) unsafe Vaults
    // const bitingVaultsFrequencies = [
    //   { templateId: 22, frequency: 1 },
    //   { templateId: 23, frequency: 10 },
    //   { templateId: 24, frequency: 50 },
    //   { templateId: 25, frequency: 100 },
    // ];
    // const allBiteAddresses = await allBitesAllFlippers();
    // bitingVaultsFrequencies.map(freq => {
    //   const biteAddresses = biteAddressesForFrequency(freq.frequency, allBiteAddresses);
    //   if (biteAddresses.addresses && biteAddresses.addresses.length > 0) {
    //     const tree = new MerkleTree(biteAddresses.addresses);
    //     if (process.env.ENVIRONMENT === "production") {
    //       // addOrUpdateTemplateRecord(
    //       //   freq.templateId,
    //       //   biteAddresses.addresses || [],
    //       //   tree.getHexRoot() || ZERO_ROOT,
    //       //   biteAddresses.progress || {},
    //       // );
    //     }
    //     console.log(
    //       tree.getHexRoot() || ZERO_ROOT,
    //     );
    //   } else {
    //     console.log('No addresses for template #' + freq.templateId)
    //   }
    //   return;
    // });
    // bidding on at least N (frequency) collateral auctions
    // const bidCollateralAuctionFrequencies = [
    //   { templateId: 26, frequency: 1 },
    //   { templateId: 27, frequency: 5 },
    //   { templateId: 28, frequency: 10 },
    //   { templateId: 29, frequency: 25 },
    // ];
    // const allBidAddressList = await allBidAddresses();
    // bidCollateralAuctionFrequencies.map(freq => {
    //   const bidAddresses = bidAddressesForFrequency(freq.frequency, allBidAddressList)
    //   if (bidAddresses.addresses && bidAddresses.addresses.length > 0) {
    //     const tree = new MerkleTree(bidAddresses.addresses);
    //     if (process.env.ENVIRONMENT === "production") {
    //       // addOrUpdateTemplateRecord(
    //       //   freq.templateId,
    //       //   bidAddresses.addresses || [],
    //       //   tree.getHexRoot() || ZERO_ROOT,
    //       //   bidAddresses.progress || {},
    //       // );
    //     }
    //     console.log(bidAddresses.addresses)
    //     console.log(bidAddresses.progress)
    //     console.log(
    //       tree.getHexRoot() || ZERO_ROOT,
    //     );
    //   } else {
    //     console.log('No Addresses for template #' + freq.templateId);
    //   }
    //   return;
    // });
    // winning at least N (frequency) collateral auctions
    const winCollateralAuctionFrequencies = [
        { templateId: 30, frequency: 1 },
        { templateId: 31, frequency: 5 },
        { templateId: 32, frequency: 10 },
        { templateId: 33, frequency: 25 },
    ];
    const allBidGuyAddressList = await auctions_1.allBidGuysAllFlippers();
    console.log(allBidGuyAddressList);
    winCollateralAuctionFrequencies.map(freq => {
        const bidGuyAddresses = auctions_1.bidGuyAddressesForFrequency(freq.frequency, allBidGuyAddressList);
        if (bidGuyAddresses.addresses && _.size(bidGuyAddresses.addresses) > 0) {
            const tree = new merkleTree_1.default(bidGuyAddresses.addresses);
            if (process.env.ENVIRONMENT === "production") {
                // addOrUpdateTemplateRecord(
                //   freq.templateId,
                //   bidGuyAddresses.addresses || [],
                //   tree.getHexRoot() || ZERO_ROOT,
                //   bidGuyAddresses.progress || {},
                // );
            }
            console.log(bidGuyAddresses.addresses);
            console.log(bidGuyAddresses.progress);
            console.log(tree.getHexRoot() || constants_1.ZERO_ROOT);
        }
    });
}
exports.updateRoots = updateRoots;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0QkFBNEI7QUFDNUIsNERBQTREO0FBQzVELFdBQVc7QUFDWCxnQ0FBZ0M7QUFDaEMsbUNBQW1DO0FBQ25DLGdDQUFnQztBQUNoQyxvQ0FBb0M7QUFDcEMsMENBQTBDO0FBQzFDLDhDQUE4QztBQUM5Qyw4Q0FBOEM7QUFDOUMsd0NBQXdDO0FBQ3hDLDhDQUE4QztBQUM5QyxtQ0FBbUM7QUFDbkMseUJBQXlCO0FBQ3pCLHlDQU9vQjtBQUNwQiw0Q0FBeUM7QUFFekMsb0RBQTZDO0FBRXRDLEtBQUssVUFBVSxXQUFXO0lBQy9CLCtCQUErQjtJQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUU3QywwQ0FBMEM7SUFDMUMsTUFBTSxRQUFRLEdBQUc7UUFDZixFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtRQUM3QixFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtLQUM5QixDQUFDO0lBQ0YsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEVBQUU7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztJQUVILDZCQUE2QjtJQUM3QixNQUFNLGNBQWMsR0FBRztRQUNyQixFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUM3QixFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtLQUMvQixDQUFDO0lBQ0YsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEVBQUU7UUFDaEMsT0FBTyxDQUFDLEdB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