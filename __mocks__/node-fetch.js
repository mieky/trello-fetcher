module.exports = function mockedFetch(url, opts) {
    let status = 200;
    if (!opts.key || !opts.token) {
        status = 401;
    }

    const result = { url, opts };
    return Promise.resolve({
        json: () => result,
        text: () => result,
        status
    });
};

