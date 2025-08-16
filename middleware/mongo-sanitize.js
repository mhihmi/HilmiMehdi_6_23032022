// Custom MongoDB sanitization middleware compatible with Express v5
// Replaces express-mongo-sanitize for Express v5 compatibility

/**
 * Recursively removes any keys that start with '$' or contain '.'
 * from an object to prevent MongoDB injection attacks
 * @param {*} payload - The object to sanitize
 * @returns {*} - The sanitized object
 */
function sanitize(payload) {
    if (payload && typeof payload === 'object') {
        if (Array.isArray(payload)) {
            return payload.map(sanitize);
        }

        const result = {};
        for (const key in payload) {
            if (payload.hasOwnProperty(key)) {
                // Skip keys that start with '$' or contain '.'
                if (!key.startsWith('$') && !key.includes('.')) {
                    result[key] = sanitize(payload[key]);
                }
            }
        }
        return result;
    }
    return payload;
}

/**
 * Express middleware for MongoDB injection protection
 * Compatible with Express v5
 */
module.exports = function mongoSanitize() {
    return (req, res, next) => {
        try {
            // Sanitize req.body
            if (req.body) {
                req.body = sanitize(req.body);
            }

            // Sanitize req.query (read-only in Express v5, so we create a new object)
            if (req.query && Object.keys(req.query).length > 0) {
                const sanitizedQuery = sanitize(req.query);
                // Use Object.defineProperty to replace the query object
                Object.defineProperty(req, 'query', {
                    value: sanitizedQuery,
                    writable: false,
                    enumerable: true,
                    configurable: true
                });
            }

            // Sanitize req.params
            if (req.params) {
                req.params = sanitize(req.params);
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};
