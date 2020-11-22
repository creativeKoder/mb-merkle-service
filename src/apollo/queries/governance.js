"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EARLY_SPELL_VOTES_QUERY = exports.USER_CONSECUTIVE_POLL_VOTE_QUERY = exports.EARLY_POLL_VOTES_QUERY = exports.USER_POLL_VOTES_QUERY = exports.PROXY_COLD_LOOKUP_QUERY = exports.PROXY_HOT_LOOKUP_QUERY = exports.ALL_EARLY_SPELL_VOTES_QUERY = exports.ALL_EARLY_POLL_VOTES_QUERY = exports.ALL_SPELL_VOTES_QUERY = exports.ALL_POLL_VOTES_QUERY = void 0;
const graphql_tag_1 = require("graphql-tag");
const constants_1 = require("../../constants");
// ADMIN QUERIES
exports.ALL_POLL_VOTES_QUERY = graphql_tag_1.default `
  query votePollActions($skip: Int) {
    votePollActions(first: ${constants_1.SUBGRAPH_BATCHES}, skip: $skip) {
      id
      sender
      poll {
        pollId
      }
      timestamp
    }
  }
`;
exports.ALL_SPELL_VOTES_QUERY = graphql_tag_1.default `
  query spellVoteActions($skip: Int) {
    addActions(first: ${constants_1.SUBGRAPH_BATCHES}, skip: $skip) {
      sender
      spell {
        id
      }
    }
  }
`;
exports.ALL_EARLY_POLL_VOTES_QUERY = graphql_tag_1.default `
  query votePollActions($skip: Int) {
    votePollActions(first: ${constants_1.SUBGRAPH_BATCHES}, skip: $skip) {
      sender
      poll {
        startDate
      }
      timestamp
    }
  }
`;
exports.ALL_EARLY_SPELL_VOTES_QUERY = graphql_tag_1.default `
  query spellVoteActions($skip: Int) {
    addActions(first: ${constants_1.SUBGRAPH_BATCHES}, skip: $skip) {
      sender
      spell {
        id
        timestamp
      }
      timestamp
    }
  }
`;
// USER QUERIES
exports.PROXY_HOT_LOOKUP_QUERY = graphql_tag_1.default `
  query hotProxyLookup($address: String) {
    voterRegistries(where: {hotAddress: $address}) {
      id
      coldAddress
      hotAddress
      voteProxies {
        id
      }
    }
  }
`;
exports.PROXY_COLD_LOOKUP_QUERY = graphql_tag_1.default `
  query coldProxyLookup($address: String) {
    voterRegistries(where: {coldAddress: $address}) {
      id
      coldAddress
      hotAddress
      voteProxies {
        id
      }
    }
  }
`;
exports.USER_POLL_VOTES_QUERY = graphql_tag_1.default `
  query votePollActions($address: String) {
    votePollActions(where: { sender: $address }) {
      id
      sender
      poll {
        pollId
      }
      timestamp
    }
  }
`;
exports.EARLY_POLL_VOTES_QUERY = graphql_tag_1.default `
  query votePollActions($address: String) {
    votePollActions(where: {sender: $address}) {
      id
      sender
      poll {
        pollId
        startDate
      }
      timestamp
    }
  }
`;
// CONSECUTIVE_POLL_VOTE_QUERY
exports.USER_CONSECUTIVE_POLL_VOTE_QUERY = graphql_tag_1.default `
  query consecutivePolls($address: String) {
    votePollActions(where: {sender: $address}) {
      id
      sender
      poll {
        pollId
      }
    }
  }
`;
// EARLY_SPELL_VOTER_QUERY
exports.EARLY_SPELL_VOTES_QUERY = graphql_tag_1.default `
  query earlySpellVotes($address: String) {
    addActions(where: {sender: $address}) {
      id
      sender
      timestamp
      spell {
        id
        timestamp
      }
    }
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ292ZXJuYW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdvdmVybmFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQThCO0FBQzlCLCtDQUFtRDtBQUVuRCxnQkFBZ0I7QUFFSCxRQUFBLG9CQUFvQixHQUFHLHFCQUFHLENBQUE7OzZCQUVWLDRCQUFnQjs7Ozs7Ozs7O0NBUzVDLENBQUM7QUFFVyxRQUFBLHFCQUFxQixHQUFHLHFCQUFHLENBQUE7O3dCQUVoQiw0QkFBZ0I7Ozs7Ozs7Q0FPdkMsQ0FBQztBQUVXLFFBQUEsMEJBQTBCLEdBQUcscUJBQUcsQ0FBQTs7NkJBRWhCLDRCQUFnQjs7Ozs7Ozs7Q0FRNUMsQ0FBQztBQUVXLFFBQUEsMkJBQTJCLEdBQUcscUJBQUcsQ0FBQTs7d0JBRXRCLDRCQUFnQjs7Ozs7Ozs7O0NBU3ZDLENBQUM7QUFFRixlQUFlO0FBRUYsUUFBQSxzQkFBc0IsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7Ozs7OztDQVd4QyxDQUFDO0FBRVcsUUFBQSx1QkFBdUIsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7Ozs7OztDQVd6QyxDQUFDO0FBRVcsUUFBQSxxQkFBcUIsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7Ozs7OztDQVd2QyxDQUFDO0FBRVcsUUFBQSxzQkFBc0IsR0FBRyxxQkFBRyxDQUFBOzs7Ozs7Ozs7Ozs7Q0FZeEMsQ0FBQztBQUVGLDhCQUE4QjtBQUNqQixRQUFBLGdDQUFnQyxHQUFHLHFCQUFHLENBQUE7Ozs7Ozs7Ozs7Q0FVbEQsQ0FBQztBQUVGLDBCQUEwQjtBQUNiLFFBQUEsdUJBQXVCLEdBQUcscUJBQUcsQ0FBQTs7Ozs7Ozs7Ozs7O0NBWXpDLENBQUMifQ==