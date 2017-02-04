const fetch = require("node-fetch");
const BPromise = require("bluebird");

/**
 * Return a preconfigured function for fetching a Trello URL asynchronously.
 *
 * Example: getAsync(`board/${BOARD_ID}/lists`, { KEY: ..., TOKEN: ... }).then(...)
 */
function TrelloFetcher(defaultOpts) {
    return function fetchTrelloURL(partialUrl, userOpts) {
        const opts = Object.assign({}, defaultOpts, userOpts);
        const queryArgs = Object.assign({}, opts.queryArgs, {
            key: opts.KEY,
            token: opts.TOKEN
        });

        const queryArgsStr =
            Object.keys(queryArgs).map(key => `${key}=${encodeURI(queryArgs[key])}`).join("&");

        return new BPromise((resolve, reject) => {
            const queryStr = `https://api.trello.com/1/${partialUrl}?${queryArgsStr}`;
            return fetch(queryStr, opts)
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        throw new Error("Authentication error: did you specify correct KEY and TOKEN?");
                    }
                    return resolve(res.json());
                })
                .catch(err => reject(err));
        });
    };
}

module.exports = TrelloFetcher;
