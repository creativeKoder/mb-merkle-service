"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makerClient = exports.daiClient = exports.makerVaultsClient = exports.governanceClient = void 0;
const cross_fetch_1 = require("cross-fetch");
const apollo_client_1 = require("apollo-client");
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const apollo_link_context_1 = require("apollo-link-context");
const apollo_link_http_1 = require("apollo-link-http");
const MAKER_URL = process.env.MAKER_URL;
const MAKER_USER = process.env.MAKER_USER;
const MAKER_PW = process.env.MAKER_PW;
exports.governanceClient = new apollo_client_1.ApolloClient({
    link: new apollo_link_http_1.HttpLink({
        uri: "https://api.thegraph.com/subgraphs/name/scottrepreneur/maker-governance",
        fetch: cross_fetch_1.default,
    }),
    cache: new apollo_cache_inmemory_1.InMemoryCache(),
});
exports.makerVaultsClient = new apollo_client_1.ApolloClient({
    link: new apollo_link_http_1.HttpLink({
        uri: "https://api.thegraph.com/subgraphs/name/graphitetools/maker",
        fetch: cross_fetch_1.default,
    }),
    cache: new apollo_cache_inmemory_1.InMemoryCache(),
});
exports.daiClient = new apollo_client_1.ApolloClient({
    link: new apollo_link_http_1.HttpLink({
        uri: "https://api.thegraph.com/subgraphs/name/raid-guild/dai-subgraph",
        fetch: cross_fetch_1.default,
    }),
    cache: new apollo_cache_inmemory_1.InMemoryCache(),
});
const authLink = apollo_link_context_1.setContext((_, { headers }) => {
    const token = Buffer.from(`${MAKER_USER}:${MAKER_PW}`).toString("base64");
    return {
        headers: Object.assign(Object.assign({}, headers), { Authorization: `Basic ${token}` }),
    };
});
exports.makerClient = new apollo_client_1.ApolloClient({
    link: authLink.concat(new apollo_link_http_1.HttpLink({
        uri: MAKER_URL,
        fetch: cross_fetch_1.default,
    })),
    cache: new apollo_cache_inmemory_1.InMemoryCache(),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsaWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQWdDO0FBQ2hDLGlEQUE2QztBQUM3QyxpRUFBc0Q7QUFDdEQsNkRBQWlEO0FBQ2pELHVEQUE0QztBQUU1QyxNQUFNLFNBQVMsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVUsQ0FBQztBQUNqRCxNQUFNLFVBQVUsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVcsQ0FBQztBQUNuRCxNQUFNLFFBQVEsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVMsQ0FBQztBQUVsQyxRQUFBLGdCQUFnQixHQUFHLElBQUksNEJBQVksQ0FBQztJQUMvQyxJQUFJLEVBQUUsSUFBSSwyQkFBUSxDQUFDO1FBQ2pCLEdBQUcsRUFDRCx5RUFBeUU7UUFDM0UsS0FBSyxFQUFMLHFCQUFLO0tBQ04sQ0FBQztJQUNGLEtBQUssRUFBRSxJQUFJLHFDQUFhLEVBQUU7Q0FDM0IsQ0FBQyxDQUFDO0FBRVUsUUFBQSxpQkFBaUIsR0FBRyxJQUFJLDRCQUFZLENBQUM7SUFDaEQsSUFBSSxFQUFFLElBQUksMkJBQVEsQ0FBQztRQUNqQixHQUFHLEVBQUUsNkRBQTZEO1FBQ2xFLEtBQUssRUFBTCxxQkFBSztLQUNOLENBQUM7SUFDRixLQUFLLEVBQUUsSUFBSSxxQ0FBYSxFQUFFO0NBQzNCLENBQUMsQ0FBQztBQUVVLFFBQUEsU0FBUyxHQUFHLElBQUksNEJBQVksQ0FBQztJQUN4QyxJQUFJLEVBQUUsSUFBSSwyQkFBUSxDQUFDO1FBQ2pCLEdBQUcsRUFBRSxpRUFBaUU7UUFDdEUsS0FBSyxFQUFMLHFCQUFLO0tBQ04sQ0FBQztJQUNGLEtBQUssRUFBRSxJQUFJLHFDQUFhLEVBQUU7Q0FDM0IsQ0FBQyxDQUFDO0FBRUgsTUFBTSxRQUFRLEdBQUcsZ0NBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7SUFDN0MsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxRSxPQUFPO1FBQ0wsT0FBTyxrQ0FDRixPQUFPLEtBQ1YsYUFBYSxFQUFFLFNBQVMsS0FBSyxFQUFFLEdBQ2hDO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDO0FBRVUsUUFBQSxXQUFXLEdBQUcsSUFBSSw0QkFBWSxDQUFDO0lBQzFDLElBQUksRUFBRSxRQUFRLENBQUMsTUFBTSxDQUNuQixJQUFJLDJCQUFRLENBQUM7UUFDWCxHQUFHLEVBQUUsU0FBUztRQUNkLEtBQUssRUFBTCxxQkFBSztLQUNOLENBQUMsQ0FDSDtJQUNELEtBQUssRUFBRSxJQUFJLHFDQUFhLEVBQUU7Q0FDM0IsQ0FBQyxDQUFDIn0=