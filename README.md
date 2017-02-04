# trello-fetcher

[![npm version](https://badge.fury.io/js/trello-fetcher.svg)](http://badge.fury.io/js/trello-fetcher) [![Build Status](https://travis-ci.org/mieky/trello-fetcher.svg?branch=master)](https://travis-ci.org/mieky/trello-fetcher)

A minimal Promise-based wrapper for easy Trello API calls.

Uses [node-fetch](https://github.com/bitinn/node-fetch) for effortless manipulation of requests.

Install with:

```js
npm install --save trello-fetcher
```

Requires Node 6+ for ES6 compatibility.

## Usage

Require and create an instance with your Trello key and API token:

```js
const TrelloFetcher = require("trello-fetcher");

const fetchTrelloURL = new TrelloFetcher({
    key: "my_secret_trello_key",
    token: "my_secret_trello_token"
});
```

After this, you're ready to start firing Trello API calls by using the very URLs in the [Trello API documentation](https://developers.trello.com/advanced-reference).

### Examples

You should be able to do pretty much all the operations listed in the Trello API, by specifying the method and possible some query arguments.

Get cards in list:

```js
fetchTrelloURL(`lists/53280b9c3a5a1241b8318206/cards`)
    .then(cards => {
        console.log(`Got ${cards.length} cards:`);
        console.log(`${JSON.stringify(cards, null, 2)}`);
    })
    .catch(err => {
        console.error(`Bork! ${err.message}`);
    });
```

Set a card name:

```js
fetchTrelloURL(`cards/${card.id}/name`, {
    method: "PUT",
    queryArgs: {
        value: card.name
    }
});
```

Set card position:

```js
fetchTrelloURL(`cards/${card.id}/pos`, {
    method: "PUT",
    queryArgs: {
        value: "bottom"
    }
});
```

## Changelog

- **0.1.0** First release.

## Acknowledgments

[![chilicorn](chilicorn.png)](http://futurice.com/blog/sponsoring-free-time-open-source-activities)

## License

[MIT](https://github.com/mieky/trello-fetcher/blob/master/LICENSE)
