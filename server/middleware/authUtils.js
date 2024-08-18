// Create an in-memory store for blacklisted tokens
const blacklistedTokens = new Set();

const addToBlacklist = (token) => {
    blacklistedTokens.add(token);
};

const isBlacklisted = (token) => {
    return blacklistedTokens.has(token);
};

module.exports = { addToBlacklist, isBlacklisted };
