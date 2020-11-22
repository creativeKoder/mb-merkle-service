"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_POT_EXITS_QUERY = exports.USER_POT_JOINS_QUERY = exports.USER_DAI_TRANSFERS_QUERY = exports.ALL_POT_EXITS_QUERY = exports.ALL_POT_JOINS_QUERY = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.ALL_POT_JOINS_QUERY = graphql_tag_1.default `
  query allPotJoins($offset: Int) {
    allPotJoins(first: 1000, offset: $offset) {
      nodes {
        id
        wad
        eventLogByLogId {
          transactionByTxHash {
            txFrom
          }
          blockNumber
          txHash
        }
      }
    }
  }
`;
exports.ALL_POT_EXITS_QUERY = graphql_tag_1.default `
  query allPotExits($offset: Int) {
    allPotExits(first: 1000, offset: $offset) {
      totalCount
      nodes {
        wad
        eventLogByLogId {
          transactionByTxHash {
            txFrom
          }
        }
      }
    }
  }
`;
// TRANSFERRED_DAI_QUERY
exports.USER_DAI_TRANSFERS_QUERY = graphql_tag_1.default `
  query userDaiTransfers($address: String) {
    transfers(where: {src: $address}) {
      wad
    }
  }
`;
exports.USER_POT_JOINS_QUERY = graphql_tag_1.default `
  query userPotJoins($address: String) {
    joins(where: {address: $address}) {
      address
      wad
      timestamp
    }
  }
`;
exports.USER_POT_EXITS_QUERY = graphql_tag_1.default `
  query userPotExits($address: String) {
    exits(where: {address: $address}) {
      address
      wad
      timestamp
    }
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGFpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUE4QjtBQUVqQixRQUFBLG1CQUFtQixHQUFHLHFCQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FnQnJDLENBQUM7QUFFVyxRQUFBLG1CQUFtQixHQUFHLHFCQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7O0NBY3JDLENBQUM7QUFFRix3QkFBd0I7QUFDWCxRQUFBLHdCQUF3QixHQUFHLHFCQUFHLENBQUE7Ozs7OztDQU0xQyxDQUFDO0FBRVcsUUFBQSxvQkFBb0IsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7OztDQVF0QyxDQUFDO0FBRVcsUUFBQSxvQkFBb0IsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7OztDQVF0QyxDQUFDIn0=