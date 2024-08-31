// Create an in-memory store for blacklisted tokens
const blacklistedTokens = new Set();

const addToBlacklist = (token) => {
    console.log('add token to this user')
    blacklistedTokens.add(token);
};

const isBlacklisted = (token) => {
    return blacklistedTokens.has(token);
};

module.exports = { addToBlacklist, isBlacklisted };
