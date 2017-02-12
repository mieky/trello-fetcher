const fetch = require("node-fetch");

/**
 * Return a preconfigured function for fetching a Trello URL asynchronously.
 *
 * Example: getAsync(`board/${BOARD_ID}/lists`, { key: ..., token: ... }).then(...)
 */
function TrelloFetcher(defaultOpts) {
    return function fetchTrelloURL(partialUrl, userOpts) {
        if (!partialUrl) {
            throw new Error("First argument to fetch() should be a Trello URL fragment");
        }

        const opts = Object.assign({}, defaultOpts, userOpts);
        const queryArgs = Object.assign({}, opts.queryArgs, {
            key: opts.key,
            token: opts.token
        });

        const queryArgsStr = Object.keys(queryArgs)
            .map(key => `${key}=${encodeURI(queryArgs[key])}`).join("&");

        const queryStr = `https://api.trello.com/1/${partialUrl}?${queryArgsStr}`;

        return fetch(queryStr, opts)
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    throw new Error("Authentication error: did you specify correct key and token?");
                }
                return res.json();
            });
    };
}

module.exports = TrelloFetcher;
