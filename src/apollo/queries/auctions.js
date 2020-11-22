"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_FLIPS_BIDS_QUERY = exports.ALL_FLIP_WINS_QUERY = exports.ALL_FLIP_BIDS_QUERY = exports.ALL_BITES_QUERY = void 0;
const graphql_tag_1 = require("graphql-tag");
const constants_1 = require("../../constants");
exports.ALL_BITES_QUERY = graphql_tag_1.default `
  query allBites($collateral: String!, $offset: Int) {
    allBites(ilkIdentifier: $collateral, first: ${constants_1.BATCH_QUERIES}, offset: $offset) {
      nodes {
        bidId
        tx {
          txFrom
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
exports.ALL_FLIP_BIDS_QUERY = graphql_tag_1.default `
  query allFlipBidEvents($offset: Int) {
    allFlipBidEvents(first: ${constants_1.BATCH_QUERIES}, offset: $offset) {
      nodes {
        bidId
        act
        tx {
          nodes {
            txFrom
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
exports.ALL_FLIP_WINS_QUERY = graphql_tag_1.default `
  query allFlipBidGuys($flipper: String!, $offset: Int) {
    allFlipBidGuys(
      filter: {
        addressByAddressId: { address: { equalToInsensitive: $flipper } }
      }
      orderBy: HEADER_BY_HEADER_ID__BLOCK_NUMBER_DESC
      first: ${constants_1.BATCH_QUERIES}
      offset: $offset
    ) {
      nodes {
        bidId
        guy
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
// USER QUERIES
// FLIP BIDS FOR USER
exports.USER_FLIPS_BIDS_QUERY = graphql_tag_1.default `
  query userFlipBids($flipper: String!, $address: String) {
    allFlipBidGuys(
      filter: {
        addressByAddressId: { address: { equalToInsensitive: $flipper } }
        guy: { equalToInsensitive: $address }
      }
      orderBy: HEADER_BY_HEADER_ID__BLOCK_NUMBER_DESC
      first: ${constants_1.BATCH_QUERIES}
      offset: 0
    ) {
      nodes {
        bidId
        guy
      }
    }
  }
`;
// FLIP WINS FOR USER
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBOEI7QUFDOUIsK0NBRXlCO0FBRVosUUFBQSxlQUFlLEdBQUcscUJBQUcsQ0FBQTs7a0RBRWdCLHlCQUFhOzs7Ozs7Ozs7Ozs7O0NBYTlELENBQUM7QUFFVyxRQUFBLG1CQUFtQixHQUFHLHFCQUFHLENBQUE7OzhCQUVSLHlCQUFhOzs7Ozs7Ozs7Ozs7Ozs7O0NBZ0IxQyxDQUFDO0FBRVcsUUFBQSxtQkFBbUIsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7O2VBT3ZCLHlCQUFhOzs7Ozs7Ozs7Ozs7O0NBYTNCLENBQUM7QUFFRixlQUFlO0FBRWYscUJBQXFCO0FBQ1IsUUFBQSxxQkFBcUIsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7OztlQVF6Qix5QkFBYTs7Ozs7Ozs7O0NBUzNCLENBQUM7QUFFRixxQkFBcUIifQ==