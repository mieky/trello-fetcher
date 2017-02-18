const TrelloFetcher = require("../src");

const TEST_KEY = "my_secret_trello_key";
const TEST_TOKEN = "my_secret_trello_token";
const BOARD_ID = "my_board_id";
const CARD_ID = "my_card_id";

let fetchTrelloURL = null;

describe("Unauthenticated usage", () => {
    beforeEach(() => {
        fetchTrelloURL = new TrelloFetcher();
    });

    it("should reject the Promise when making a request without key or token", () => {
        let errorThrown = false;
        let errorMsg = null;

        return fetchTrelloURL(`boards/${BOARD_ID}/cards`)
            .catch(err => {
                errorThrown = true;
                errorMsg = err.message;
            })
            .then(() => {
                expect(errorThrown).toBe(true);
                expect(errorMsg).toBe("Authentication error: did you specify correct key and token?");
            });
    });
});

describe("Basic authenticated usage", () => {
    beforeEach(() => {
        fetchTrelloURL = new TrelloFetcher({
            key: TEST_KEY,
            token: TEST_TOKEN
        });
        expect(1).toBe(1);
        expect(fetchTrelloURL).toBeInstanceOf(Function);
    });

    it("should throw Error when called without an URL", () => {
        expect(fetchTrelloURL).toThrow("First argument to fetch() should be a Trello URL fragment");
    });

    it("should include key and token in requests", () =>
        fetchTrelloURL(`boards/${BOARD_ID}/cards`).then(args => {
            expect(args.opts.key).toBe(TEST_KEY);
            expect(args.opts.token).toBe(TEST_TOKEN);
            expect(args.url).toBe("https://api.trello.com/1/boards/my_board_id/cards?key=my_secret_trello_key&token=my_secret_trello_token");

            return args;
        })
    );

    it("should encode values sent as queryArgs", () => {
        const myTrickyName = "Jorma Teräs, Kova & Tiukka Ukko";

        return fetchTrelloURL(`cards/${CARD_ID}/name`, {
            method: "PUT",
            queryArgs: {
                value: myTrickyName
            }
        }).then(args => {
            expect(args.opts.method).toBe("PUT");
            expect(args.url).toBe("https://api.trello.com/1/cards/my_card_id/name?value=Jorma%20Ter%C3%A4s,%20Kova%20&%20Tiukka%20Ukko&key=my_secret_trello_key&token=my_secret_trello_token");
        });
    });
});
