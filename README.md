# trello-fetcher

A minimal Promise-based wrapper for easy Trello API calls.

Uses [node-fetch](https://github.com/bitinn/node-fetch) and [Bluebird promises](https://github.com/petkaantonov/bluebird/) for easy manipulation of JSON results.

Installation:

`npm install --save trello-fetcher`

Requires Node 6+ for ES6 compatibility.

## Usage

Then create an instance with your Trello key and API token.

    const TrelloFetcher = require("trello-fetcher");

    const fetchTrelloURL = new TrelloFetcher({
        key: "my_secret_trello_key",
        token: "my_secret_trello_token"
    });

After this, you're ready to start firing Trello API calls by using the very URLs in the [Trello API documentation](https://developers.trello.com/advanced-reference).

*Get cards in list:*

    fetchTrelloURL(`lists/53280b9c3a5a1241b8318206/cards`)
        .then(cards => {
            console.log(`Got ${cards.length} cards:`);
            console.log(`${JSON.stringify(cards, null, 2)}`);
        })
        .catch(err => {
            console.error(`Bork! ${err.message}`);
        });

Similarly, you should be able to do pretty much all the operations listed in the Trello API, by specifying the method and possible some query arguments. For example:

- Set a card name:

    fetchTrelloURL(`cards/${card.id}/name`, {
        method: "PUT",
        queryArgs: {
            value: card.name
        }
    });

- Set card position:

    fetchTrelloURL(`cards/${card.id}/pos`, {
        method: "PUT",
        queryArgs: {
            value: "bottom"
        }
    });

## Acknowledgements

[![chilicorn](chilicorn.png)](http://futurice.com/blog/sponsoring-free-time-open-source-activities)

## License

[MIT](https://github.com/mieky/trello-fetcher/blob/master/LICENSE)
